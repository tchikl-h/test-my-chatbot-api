import { Request, Response, NextFunction } from "express";
import CompanyModel from "../../models/company";

/**
* Post companies
* url : http://localhost:8080/v1/companies {"companyName": "Apple", "companyDescription": "Awesome Description"}
*/
export default function postCompanies(req: Request, res: Response, next: NextFunction) {
    console.log(req.body.companyName);
    console.log(req.body.companyDescription);
    CompanyModel.create({
        name: req.body.companyName,
        description: req.body.companyDescription,
        created_at: new Date(),
        date_update: new Date(),
        deleted_at: null,
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
    .then((company: CompanyModel) => {
        res.status(200).send(company);
    })
}