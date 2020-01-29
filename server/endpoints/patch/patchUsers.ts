import { Request, Response, NextFunction } from "express";
import UserModel from "../../models/user";
import * as bcrypt from "bcrypt";

/**
* Post users
* url : http://localhost:8080/v1/users/:id {"firstName": "Roger", "lastName": "Smith", "userName": "rsmith", "password": "toto123", "chatbotIds": 10, "companyId": 4}
*/
export default function patchUsers(req: Request, res: Response, next: NextFunction) {
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
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password ? bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)) : user.password,
            mail: req.body.mail,
            chatbotIds: req.body.chatbotIds,
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