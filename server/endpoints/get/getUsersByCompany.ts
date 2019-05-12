import { Request, Response, NextFunction } from "express";
import CompanyModel from "../../models/company";
import UserModel from "../../models/user";

/**
 * Get users from a company
 * url : http://localhost:8080/v1/companies/1/users
 */
export default function getUserByCompany(req: Request, res: Response, next: NextFunction) {
    CompanyModel.findOne({
        include: [UserModel],
        where: {
            id: req.params.id
        }
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
    .then((company: CompanyModel) => {
        res.status(200).send(company.users);
    })
}