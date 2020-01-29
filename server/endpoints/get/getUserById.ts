import { Request, Response, NextFunction } from "express";
import CompanyModel from "../../models/company";
import UserModel from "../../models/user";

/**
 * Get a specific user from a company
 * url : http://localhost:8080/v1/companies/1/users/1
 */
export default function getUserById(req: Request, res: Response, next: NextFunction) {
    CompanyModel.findOne({
        include: [UserModel],
        where: {
            id: req.params.companyId
        }
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
    .then((company: CompanyModel) => {
        let user = company.users.find((user) => user.id == req.params.userId);
        res.status(200).send(user);
    })
}