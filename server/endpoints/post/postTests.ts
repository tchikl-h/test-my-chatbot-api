import { Request, Response, NextFunction } from "express";
import TestModel from "../../models/test";
import * as bcrypt from "bcrypt";

/**
* Post tests
* url : http://localhost:8080/v1/tests {"name": "Test 1", "description": "description", "chatbotId": 10}
*/
export default function postTests(req: Request, res: Response, next: NextFunction) {
    console.log(new Date());
    TestModel.create({
        name: req.body.name,
        description: req.body.description,
        error: false,
        chatbotId: parseInt(req.body.chatbotId),
        created_at: new Date(),
        date_update: new Date(),
        deleted_at: null,
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
    .then((test) => {
        res.status(200).send(test);
    })
}