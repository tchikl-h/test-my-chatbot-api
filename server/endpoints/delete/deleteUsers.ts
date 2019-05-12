import { Request, Response, NextFunction } from "express";
import UserModel from "../../models/user";

/**
* Delete users
* url : http://localhost:8080/v1/user/1
*/
export default function deleteUsers(req: Request, res: Response, next: NextFunction) {
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
        UserModel.destroy({
            where: {
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
    })
}