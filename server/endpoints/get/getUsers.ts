import { Request, Response, NextFunction } from "express";
import UserModel from "../../models/user";

/**
 * Get users
 * url : http://localhost:8080/v1/users
 */
export default function getUsers(req: Request, res: Response, next: NextFunction) {
    UserModel.findAll()
    .catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
    .then((users: UserModel[]) => {
        res.status(200).send(users);
    })
}