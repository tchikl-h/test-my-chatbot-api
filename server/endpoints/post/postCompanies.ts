import { Request, Response, NextFunction } from "express";
import CompanyModel from "../../models/company";

/**
* Post companies
* url : http://localhost:8080/v1/companies {"companyName": "Apple", "companyDescription": "Awesome Description"}
*/
export default function postCompanies(req: Request, res: Response, next: NextFunction) {
    CompanyModel.create({
        name: req.body.companyName,
        description: req.body.companyDescription,
        date_update: new Date()
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
    .then(() => {
        res.status(200).send();
    })
}