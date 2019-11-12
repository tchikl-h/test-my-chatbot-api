import { Request, Response, NextFunction } from "express";
import AssertionModel from "../../models/assertion";

/**
* Patch assertions
* url : http://localhost:8080/v1/assertions/:id {"userInput": "Hello", "chatbotResponse": "Hi :)", "intent": "Welcome", "error": null, "testId": "1"}
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
            userInput: req.body.userInput,
            chatbotResponse: req.body.chatbotResponse,
            intent: req.body.intent,
            error: req.body.error,
            testId: parseInt(req.params.id),
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