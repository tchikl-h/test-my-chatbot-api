import { Request, Response, NextFunction } from "express";
import AssertionModel from "../../models/assertion";

/**
* Patch assertions
* url : http://localhost:8080/v1/assertions/:id {"orderId": 0, "userInput": "Hello", "chatbotResponse": "Hi :)", "intent": "Welcome", "testId": "1"}
*/
export default function patchAssertions(req: Request, res: Response, next: NextFunction) {
    AssertionModel.findOne({
        where: {
            id: req.params.id,
        }
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
    .then((assertion) => {
        if (!assertion) {
            res.status(404).send(`Not found: resource ${req.params.id} does not exist for assertion`)
            return;
        }
        AssertionModel.update({
            order: req.body.orderId || assertion.order,
            userInput: req.body.userInput || assertion.userInput,
            chatbotResponse: req.body.chatbotResponse || assertion.chatbotResponse,
            intent: req.body.intent || assertion.intent,
            testId: parseInt(req.body.testId) || assertion.testId,
            date_update: new Date()
        }, {
            where : {
                id: req.params.id,
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send(err)
        })
        .then(() => {
            res.status(200).send();
        })
    });
}