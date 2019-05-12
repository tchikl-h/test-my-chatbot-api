import { Request, Response, NextFunction } from "express";
import CompanyModel from "../../models/company";

/**
* Get companies
* url : http://localhost:8080/v1/companies
*/
export default function getCompanies(req: Request, res: Response, next: NextFunction) {
    CompanyModel.findAll()
    .catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
    .then((companies: CompanyModel[]) => {
        res.status(200).send(companies);
    })
}