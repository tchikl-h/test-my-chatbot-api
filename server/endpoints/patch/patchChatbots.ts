import { Request, Response, NextFunction } from "express";
import ChatbotModel from "../../models/chatbot";
import UserModel from "../../models/user";
import CompanyModel from "../../models/company";
import { exec } from 'child_process';

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
            container_mode: req.body.containerMode,
            dialogflow_project_id: req.body.dialogflowProjectId,
            dialogflow_client_email: req.body.dialogflowClientEmail,
            dialogflow_private_key: req.body.dialogflowPrivateKey,
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
            // create a container for all the users in the company
            UserModel.findAll({
                where: {
                    companyId: prevChatbot.companyId
                },
                include: [CompanyModel]
            })
            .catch((err) => {
                console.log(err)
                res.status(500).send(err)
            })
            .then((users: UserModel[]) => {

                exec(`docker volume create --name ${users[0].company.name}_${req.body.projectName}`, (err, stdout, stderr) => {
                    if (err)
                        console.log(err);
                    let containerIds = "";
                    users.forEach(user => {
                        containerIds = containerIds + ` $(docker ps -aqf "name=${user.company.name}_${prevChatbot.project_name}_${user.userName}") `;
                    })
                    console.log(`docker stop ${containerIds} && docker rm ${containerIds}`);
                    exec(`docker stop ${containerIds} && docker rm ${containerIds}`, (err, stdout, stderr) => {
                        if (err)
                            console.log(err);
                        users.forEach(user => {
                            exec(`docker create -v ${user.company.name}_${req.body.projectName}:/home/botium-bindings/samples/botframework/spec/convo --name ${user.company.name}_${req.body.projectName}_${user.userName} -e PROJECTNAME='${req.body.projectName}' -e CONTAINERMODE='${req.body.containerMode}' -e DIALOGFLOW_PROJECT_ID='${req.body.dialogflowProjectId}' -e DIALOGFLOW_CLIENT_EMAIL='${req.body.dialogflowClientEmail}' -e DIALOGFLOW_PRIVATE_KEY='${req.body.dialogflowPrivateKey}' -e COMPANY_ID='${req.body.companyId}' -e CHATBOT_ID='${prevChatbot.id}' -e USER_ID='${user.id}' -e HOST='${process.env.HOST}' chatbot:latest sh -c "cd /home/botium-bindings/samples/botframework/node_modules/jasmine ; npm run dotenvInit ; cd /home/botium-bindings/samples/botframework/node_modules/botium-cli ; npm run dotenvInit ; cd ../.. ; mkdir -p logs/${user.company.name}/${req.body.projectName}/${user.userName} ; npm run generateBotium && npm run emulator"`, (err, stdout, stderr) => {
                                if (err)
                                    console.log(err);
                            });
                        });
                    });
                    res.status(200).send();
                });
            });
        })
    });
}