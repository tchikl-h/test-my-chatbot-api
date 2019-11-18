import { Request, Response, NextFunction } from "express";
import ChatbotModel from "../../models/chatbot";
import UserModel from "../../models/user";
import CompanyModel from "../../models/company";

/**
* Post chatbots
* url : http://localhost:8080/v1/chatbots {"projectName": "Chatbot Apple B", "description": "Awesome Description", "containerMode": "Dialogflow", "dialogflowProjectId": 5678987655, "dialogflowClientEmail": "apple@hotmail.fr", "dialogflowPrivateKey": "UY9J8F8EZ7D8D687ZJYEF98Y", "companyId": 4}
*/
export default function postChatbots(req: Request, res: Response, next: NextFunction) {
    ChatbotModel.create({
        project_name: req.body.projectName,
        description: req.body.description,
        dialogflow_project_id: req.body.dialogflowProjectId,
        dialogflow_client_email: req.body.dialogflowClientEmail,
        dialogflow_private_key: req.body.dialogflowPrivateKey,
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