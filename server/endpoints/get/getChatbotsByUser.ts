import { Request, Response, NextFunction } from "express";
import CompanyModel from "../../models/company";
import ChatbotModel from "../../models/chatbot";
import UserModel from "../../models/user";

/**
* Get chatbots from a user
* url : http://localhost:8080/v1/companies/1/users/1/chatbots
*/
export default function getChatbotsByUser(req: Request, res: Response, next: NextFunction) {
    UserModel.findOne({
        where: {
            id: req.params.userId
        },
        include: [{
            model: CompanyModel,
            include: [ChatbotModel],
            where: {
                id: req.params.companyId
            }
        }]
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
    .then((user: UserModel) => {
        let Allowedchatbots = user.company.chatbots.filter((chatbot) => {
            if (user.chatbotIds) {
                for(let i = 0; i < user.chatbotIds.length; i++) {
                    if (chatbot.id === user.chatbotIds[i]) {
                        return chatbot;
                    }
                }
            }
        })
        res.status(200).send(Allowedchatbots);
    })
}