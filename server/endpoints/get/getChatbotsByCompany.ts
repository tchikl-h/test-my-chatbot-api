import { Request, Response, NextFunction } from "express";
import CompanyModel from "../../models/company";
import ChatbotModel from "../../models/chatbot";

/**
* Get chatbots from a company
* url : http://localhost:8080/v1/companies/1/chatbots
*/
export default function getChatbotsByCompany(req: Request, res: Response, next: NextFunction) {
    CompanyModel.findOne({
        include: [ChatbotModel],
        where: {
            id: req.params.id
        }
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
    .then((company: CompanyModel) => {
        res.status(200).send(company.chatbots);
    })
}