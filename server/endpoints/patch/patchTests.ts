import { Request, Response, NextFunction } from "express";
import TestModel from "../../models/test";

/**
* Post tests
* url : http://localhost:8080/v1/tests {"name": "Test 1", "description": "description", "chatbotId": 10}
*/
export default function postTests(req: Request, res: Response, next: NextFunction) {
    TestModel.findOne({
        where: {
            id: req.params.id,
        }
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
    .then((test) => {
        if (!test) {
            res.status(404).send(`Not found: resource ${req.params.id} does not exist for test`)
            return;
        }
        TestModel.update({
            name: req.body.name,
            description: req.body.description,
            chatbotId: parseInt(req.body.chatbotId),
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