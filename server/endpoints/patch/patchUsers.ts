import { Request, Response, NextFunction } from "express";
import UserModel from "../../models/user";

/**
* Post users
* url : http://localhost:8080/v1/users {"name": "User Apple A", "chatbotIds": 10, "companyId": 4}
*/
export default function postUsers(req: Request, res: Response, next: NextFunction) {
    UserModel.findOne({
        where: {
            id: req.params.id,
        }
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
    .then((user) => {
        if (!user) {
            res.status(404).send(`Not found: resource ${req.params.id} does not exist for user`)
            return;
        }
        UserModel.update({
            name: req.body.name,
            chatbotIds: JSON.parse(req.body.chatbotIds),
            companyId: parseInt(req.body.companyId),
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