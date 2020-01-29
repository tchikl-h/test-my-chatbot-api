import { Request, Response, NextFunction } from "express";
import UserModel from "../../models/user";
import * as bcrypt from "bcrypt";

/**
* Post users
* url : http://localhost:8080/v1/users {"firstName": "Roger", "lastName": "Smith", "userName": "rsmith", "password": "toto123", "chatbotIds": 10, "companyId": 4}
*/
export default function postUsers(req: Request, res: Response, next: NextFunction) {
    UserModel.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
        mail: req.body.mail,
        chatbotIds: req.body.chatbotIds,
        companyOwner: req.body.companyOwner ? req.body.companyOwner : false,
        companyId: parseInt(req.body.companyId),
        created_at: new Date(),
        date_update: new Date(),
        deleted_at: null,
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
    .then((user: UserModel) => {
        res.status(200).send(user);
    })
}