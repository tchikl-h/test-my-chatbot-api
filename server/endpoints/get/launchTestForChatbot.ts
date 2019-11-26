import { Request, Response, NextFunction } from "express";
import ChatbotModel from "../../models/chatbot";
import TestModel from "../../models/test";
import AssertionModel from "../../models/assertion";
import axios from "axios";
import { patchTests } from "..";

/**
* Launch all the tests for the chatbot
* url : http://localhost:8080/v1/companies/1/users/1/chatbots/1/tests/1/launch
*/
export default function launchTestForChabtot(req: Request, res: Response, next: NextFunction) {
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
            for (let i = 0; i < test.assertions.length; i++) {
                let assertion = test.assertions.find(e => e.order === i)
                // console.log(`=-=-=-=-=-=>${assertion.order}<=-=-=-=-=-=`);
                axios.get(`${chatbot.webhook_url}`, {
                    params: {
                        msg: assertion.userInput
                    }
                })
                .then((response) => {
                    // console.log(`${response.data.intent} !== ${assertion.dataValues.intent}`);
                    if (response.data.intent !== assertion.dataValues.intent) {
                        // console.log(`_____________> user says : ${assertion.userInput}, chatbot intent: ${response.data.intent}, chatbot responded ${response.data.chatbotResponse}<__________`);
                        // console.log(`---------->${test.id}<---------`);
                        // console.log(`============>${assertion.dataValues.intent}<=============`);
                        // UPDATE ASSERTION
                        AssertionModel.update({
                            error: `Error : intent '${assertion.intent}' expected but got intent '${response.data.intent}' instead.`,
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
                })
                .catch((err) => {
                    console.log(err);
                });
            }
            res.status(200).send(test);
        })
    })
}