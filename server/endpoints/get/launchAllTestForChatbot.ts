import { Request, Response, NextFunction } from "express";
import ChatbotModel from "../../models/chatbot";
import TestModel from "../../models/test";
import AssertionModel from "../../models/assertion";
import axios from "axios";

const io = require("socket.io-client");
let socketio
let i = 0;
let j = 0;

function updateAssertion(expectedIntent: string, receivedIntent: string, assertionId: number) {
    return AssertionModel.update({
        error: expectedIntent !== receivedIntent ? `Error : intent '${expectedIntent}' expected but got intent '${receivedIntent}' instead.` : "",
        date_update: new Date()
    }, {
        where : {
            id: assertionId,
        }
    })
}

function updateTest(test: TestModel, res: Response, isError: boolean) {
    return TestModel.update({
        error: isError,
        date_update: new Date()
    }, {
        where : {
            id: test.id,
        }
    })
}

function getChatbotById(chatbotId: number) {
    return ChatbotModel.findOne({
        where: {
            id: chatbotId,
        },
        include: [{
            model: TestModel,
            include: [AssertionModel],
        }]
    })
}

async function launchAssertion(chatbot: ChatbotModel, res: Response, tests: TestModel[], data: any) {
    let test: TestModel = tests[j];
    let assertion: AssertionModel = test.assertions.find(e => e.order === i)
    // An error is detected, changing "error" in DB
    if (assertion && data.intent !== assertion.dataValues.intent) {
        try {
            await updateAssertion(assertion.dataValues.intent, data.intent, assertion.id);
            await updateTest(test, res, true);
        } catch(e) {
            res.status(500).send(e);
            throw e;
        }
    }
    else {
        // Erase the error in DB
        if (assertion.error != "") {
            try {
                await updateAssertion(assertion.dataValues.intent, data.intent, assertion.id);
                await updateTest(test, res, false);
            } catch(e) {
                res.status(500).send(e);
                throw e;
            }
        }
    }
    if (i + 1 < test.assertions.length) {
        i++;
        let nextAssertion = test.assertions.find(e => e.order === i)
        console.log("send to chatbot : "+nextAssertion.userInput);
        axios({
            method: 'post',
            url: chatbot.webhook_url,
            data: {
                msg: nextAssertion.userInput
            }
        })
        return;
    }
    else if (j + 1 < tests.length) {
        i = 0;
        j++;
        let test = tests[j];
        let nextAssertion = test.assertions.find(e => e.order === i)
        console.log("send to chatbot : "+nextAssertion.userInput);
        axios({
            method: 'post',
            url: chatbot.webhook_url,
            data: {
                msg: nextAssertion.userInput
            }
        })
        return;
    }
    else {
        socketio.close();
        try {
            let newChatbot: ChatbotModel = await getChatbotById(chatbot.id);
            if (!newChatbot) {
                res.status(404).send(`Not found: resource ${chatbot.id} does not exist for chatbot`)
                return;
            }
            res.status(200).send(newChatbot.tests);
        } catch(e) {
            res.status(500).send(e);
            throw e;
        }
        return;
    }
}

/**
* Launch all the tests for the chatbot
* url : http://localhost:8080/v1/companies/1/users/1/chatbots/1/tests/1/launch
*/
export default async function launchAllTestForChabtot(req: Request, res: Response, next: NextFunction) {
    i = 0;
    j = 0;
    socketio = io.connect(process.env.HOST_API);
    socketio.emit('test');
    try {
        let chatbot: ChatbotModel = await getChatbotById(req.params.chatbotId);
        if (!chatbot) {
            res.status(404).send(`Not found: resource ${req.params.chatbotId} does not exist for chatbot`)
            return;
        }
        socketio.on('message:test', (data) => launchAssertion(chatbot, res, chatbot.tests, data));
        let assertion = chatbot.tests[0].assertions.find(e => e.order === 0)
        axios({
            method: 'post',
            url: chatbot.webhook_url,
            data: {
                msg: assertion.userInput
            }
        })
    } catch(e) {
        res.status(500).send(e);
        throw e;
    }
}