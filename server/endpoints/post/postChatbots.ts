import { Request, Response, NextFunction } from "express";
import ChatbotModel from "../../models/chatbot";
import UserModel from "../../models/user";
import CompanyModel from "../../models/company";
import { exec } from 'child_process';

/**
* Post chatbots
* url : http://localhost:8080/v1/chatbots {"projectName": "Chatbot Apple B", "description": "Awesome Description", "containerMode": "Dialogflow", "dialogflowProjectId": 5678987655, "dialogflowClientEmail": "apple@hotmail.fr", "dialogflowPrivateKey": "UY9J8F8EZ7D8D687ZJYEF98Y", "companyId": 4}
*/
export default function postChatbots(req: Request, res: Response, next: NextFunction) {
    ChatbotModel.create({
        project_name: req.body.projectName,
        description: req.body.description,
        container_mode: req.body.containerMode,
        dialogflow_project_id: req.body.dialogflowProjectId,
        dialogflow_client_email: req.body.dialogflowClientEmail,
        dialogflow_private_key: req.body.dialogflowPrivateKey,
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
            },
            include: [CompanyModel]
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send(err)
        })
        .then((user: UserModel) => {
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
                // create a container for all the users in the company
                UserModel.findAll({
                    where: {
                        companyId: chatbot.companyId
                    },
                    include: [CompanyModel]
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).send(err)
                })
                .then((users: UserModel[]) => {
                    exec(`docker volume create --name ${user.company.name}_${chatbot.project_name}`, (err, stdout, stderr) => {
                        if (err)
                            console.log(err);
                        users.forEach(user => {
                            exec(`docker create -v ${user.company.name}_${chatbot.project_name}:/home/botium-bindings/samples/botframework/spec/convo --name ${user.company.name}_${chatbot.project_name}_${user.userName} -e PROJECTNAME='${chatbot.project_name}' -e CONTAINERMODE='${chatbot.container_mode}' -e DIALOGFLOW_PROJECT_ID='${chatbot.dialogflow_project_id}' -e DIALOGFLOW_CLIENT_EMAIL='${chatbot.dialogflow_client_email}' -e DIALOGFLOW_PRIVATE_KEY='${chatbot.dialogflow_private_key}' -e COMPANY_ID='${chatbot.companyId}' -e CHATBOT_ID='${chatbot.id}' -e USER_ID='${user.id}' -e HOST='${process.env.HOST}' chatbot:latest sh -c "cd /home/botium-bindings/samples/botframework/node_modules/jasmine ; npm run dotenvInit ; cd /home/botium-bindings/samples/botframework/node_modules/botium-cli ; npm run dotenvInit ; cd ../.. ; mkdir -p logs/${user.company.name}/${chatbot.project_name}/${user.userName} ; npm run generateBotium && npm run emulator"`, (err, stdout, stderr) => {
                                if (err)
                                    console.log(err);
                            });
                        })
                        res.status(200).send();
                    });
                });
            })
        });
        res.status(200).send();
    })
}