import { Request, Response, NextFunction } from "express";
import CompanyModel from "../../models/company";

/**
* Delete companies
* url : http://localhost:8080/v1/companies/1
*/
export default function deleteCompanies(req: Request, res: Response, next: NextFunction) {
    CompanyModel.findOne({
        where: {
            id: req.params.id,
        }
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
    .then((company) => {
        if (!company) {
            res.status(404).send(`Not found: resource ${req.params.id} does not exist for company`)
            return;
        }
        CompanyModel.destroy({
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