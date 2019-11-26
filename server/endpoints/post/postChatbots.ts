import { Request, Response, NextFunction } from "express";
import ChatbotModel from "../../models/chatbot";
import UserModel from "../../models/user";
import CompanyModel from "../../models/company";

/**
* Post chatbots
* url : http://localhost:8080/v1/chatbots {"webhook_url": "https://chatbot.com", "projectName": "Chatbot Apple B", "description": "Awesome Description", "companyId": 4}
*/
export default function postChatbots(req: Request, res: Response, next: NextFunction) {
    ChatbotModel.create({
        project_name: req.body.projectName,
        description: req.body.description,
        webhook_url: req.body.webhook_url,
        periodic_build: req.body.periodicBuild,
        companyId: parseInt(req.body.companyId),
        created_at: new Date(),
        date_update: new Date(),
        deleted_at: null,
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
    .then((chatbot: ChatbotModel) => {
        // add the new chatbotId in the chatbotIds of the companyOwner
        UserModel.findOne({
            where: {
                companyOwner: true,
                companyId: chatbot.companyId
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send(err)
        })
        .then((user: UserModel) => {
            if (!user.chatbotIds)
                user.chatbotIds = [];
            let newChatbotIds = user.chatbotIds;
            newChatbotIds.push(chatbot.id);
            UserModel.update({
                chatbotIds: newChatbotIds,
                date_update: new Date()
            }, {
                where : {
                    id: user.id,
                }
            })
            .catch((err) => {
                console.log(err)
                res.status(500).send(err)
            })
            .then(() => {
                res.status(200).send();
            });
        });
    })
}