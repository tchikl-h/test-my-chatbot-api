import { Request, Response, NextFunction } from "express";
import TestModel from "../../models/test";

/**
* Post tests
* url : http://localhost:8080/v1/tests {"name": "Test 1", "description": "description", "chatbotId": 10}
*/
export default function postTests(req: Request, res: Response, next: NextFunction) {
    TestModel.create({
        name: req.body.name,
        description: req.body.description,
        chatbotId: parseInt(req.body.chatbotId),
        date_update: new Date()
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
    .then(() => {
        res.status(200).send();
    })
}