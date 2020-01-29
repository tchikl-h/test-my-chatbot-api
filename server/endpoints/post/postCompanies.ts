import { Request, Response, NextFunction } from "express";
import CompanyModel from "../../models/company";

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

/**
* Post companies
* url : http://localhost:8080/v1/companies {"companyName": "Apple", "companyDescription": "Awesome Description"}
*/
export default function postCompanies(req: Request, res: Response, next: NextFunction) {
    CompanyModel.create({
        name: req.body.companyName,
        description: req.body.companyDescription,
        token: makeid(10),
        premium: req.body.premium,
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