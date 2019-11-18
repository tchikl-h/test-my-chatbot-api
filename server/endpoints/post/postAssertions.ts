import { Request, Response, NextFunction } from "express";
import AssertionModel from "../../models/assertion";

/**
* Post assertions
* url : http://localhost:8080/v1/assertions {"userInput": "Hello", "chatbotResponse": "Hi :)", "intent": "Welcome", "testId": "1"}
*/
export default function postAssertions(req: Request, res: Response, next: NextFunction) {
    AssertionModel.create({
        userInput: req.body.userInput,
        chatbotResponse: req.body.chatbotResponse,
        intent: req.body.intent,
        testId: parseInt(req.body.testId),
        created_at: new Date(),
        date_update: new Date(),
        deleted_at: null,
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
    .then(() => {
        res.status(200).send();
    })
}