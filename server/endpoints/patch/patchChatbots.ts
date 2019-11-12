import { Request, Response, NextFunction } from "express";
import ChatbotModel from "../../models/chatbot";

/**
* Patch chatbots
* url : http://localhost:8080/v1/chatbots {"projectName": "Chatbot Apple B", "description": "Awesome Description", "containerMode": "Dialogflow", "dialogflowProjectId": 5678987655, "dialogflowClientEmail": "apple@hotmail.fr", "dialogflowPrivateKey": "UY9J8F8EZ7D8D687ZJYEF98Y", "companyId": 4}
*/
export default function patchChatbots(req: Request, res: Response, next: NextFunction) {
    ChatbotModel.findOne({
        where: {
            id: req.params.id,
        }
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
    .then((prevChatbot: ChatbotModel) => {
        if (!prevChatbot) {
            res.status(404).send(`Not found: resource ${req.params.id} does not exist for chatbot`)
            return;
        }
        ChatbotModel.update({
            project_name: req.body.projectName,
            description: req.body.description,
            dialogflow_project_id: req.body.dialogflowProjectId,
            dialogflow_client_email: req.body.dialogflowClientEmail,
            dialogflow_private_key: req.body.dialogflowPrivateKey,
            periodic_build: req.body.periodicBuild,
            companyId: parseInt(req.body.companyId),
            date_update: new Date()
        }, {
            where : {
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
    });
}