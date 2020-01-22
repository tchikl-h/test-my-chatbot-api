import { Request, Response, NextFunction } from "express";
import ChatbotModel from "../../models/chatbot";
import TestModel from "../../models/test";
import AssertionModel from "../../models/assertion";
import axios from "axios";
import { patchTests } from "..";
const io = require("socket.io-client");
let socketio;
let i = 1;

function launchAssertion(chatbot, res, test, data) {
    console.log(data.userInput);
    let assertion = test.assertions.find(e => e.order === i)
    if (assertion && data.intent !== assertion.dataValues.intent) {
        // UPDATE ASSERTION
        AssertionModel.update({
            error: `Error : intent '${assertion.intent}' expected but got intent '${data.intent}' instead.`,
            date_update: new Date()
        }, {
            where : {
                id: assertion.dataValues.id,
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send(err)
        })
        // UPDATE TEST
        TestModel.update({
            error: true,
            date_update: new Date()
        }, {
            where : {
                id: test.id,
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send(err)
        })
    }
    let nextAssertion = test.assertions.find(e => e.order === i)
    i++;
    if (i <= test.assertions.length) {
        axios({
            method: 'post',
            url: chatbot.webhook_url,
            data: {
                msg: nextAssertion.userInput
            }
        })
    }
    else {
        socketio = "";
    }
}

/**
* Launch all the tests for the chatbot
* url : http://localhost:8080/v1/companies/1/users/1/chatbots/1/tests/1/launch
*/
export default function launchTestForChabtot(req: Request, res: Response, next: NextFunction) {
    socketio = io.connect(process.env.HOST_API);
    socketio.emit('test');
    i = 1;
    ChatbotModel.findOne({
        where: {
            id: req.params.chatbotId,
        }
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
    .then((chatbot: ChatbotModel) => {
        if (!chatbot) {
            res.status(404).send(`Not found: resource ${req.params.chatbotId} does not exist for chatbot`)
            return;
        }
        TestModel.findOne({
            where: {
                id: req.params.testId
            },
            include: [AssertionModel]
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send(err)
        })
        .then((test: TestModel) => {
            socketio.on('message:test', (data) => launchAssertion(chatbot, res, test, data)); // instruction pour demain : socketio.on est appelé autant de fois qu'il y a des tests, donc ça marde. L'objectif va etre de plutot faire un endpoint qui lance tous les tests au lieu de celui ci qui lance 1 test à la fois, comme ça on aura que 1 seul instance de socket et pas de bug
            let assertion = test.assertions.find(e => e.order === 0)
            axios({
                method: 'post',
                url: chatbot.webhook_url,
                data: {
                    msg: assertion.userInput
                }
            })
            res.status(200).send(test);
        })
    })
}