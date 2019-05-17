import { Request, Response, NextFunction } from "express";
import UserModel from "../../models/user";

/**
* Post users
* url : http://localhost:8080/v1/users {"name": "User Apple A", "chatbotIds": 10, "companyId": 4}
*/
export default function postUsers(req: Request, res: Response, next: NextFunction) {
    UserModel.create({
        name: req.body.name,
        chatbotIds: JSON.parse(req.body.chatbotIds),
        companyId: parseInt(req.body.companyId),
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