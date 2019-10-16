import { Request, Response, NextFunction } from "express";
import ChatbotModel from "../../models/chatbot";
import UserModel from "../../models/user";
import CompanyModel from "../../models/company";
import { exec } from 'child_process';

/**
* Delete chatbot
* url : http://localhost:8080/v1/chatbots/1
*/
export default function deleteChatbots(req: Request, res: Response, next: NextFunction) {
    ChatbotModel.findOne({
        where: {
            id: req.params.id,
        },
        include: [CompanyModel]
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
    .then((chatbot: ChatbotModel) => {
        if (!chatbot) {
            res.status(404).send(`Not found: resource ${req.params.id} does not exist for chatbot`)
            return;
        }
        ChatbotModel.destroy({
            where: {
                id: req.params.id,
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send(err)
        })
        .then(() => {
            // TODO: delete all references from this chatbot in users of the company

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
                // TODO: properly delete the spec/convo/* when the chatbot is being deleted
                console.log(`docker start $(docker ps -aqf "name=${process.env.NODE_ENV}_${chatbot.company.name}_${chatbot.project_name}_${users[0].userName}")`);
                exec(`docker start $(docker ps -aqf "name=${process.env.NODE_ENV}_${chatbot.company.name}_${chatbot.project_name}_${users[0].userName}")`, (err, stdout, stderr) => {
                    console.log(`docker exec -d $(docker ps -aqf "name=${process.env.NODE_ENV}_${chatbot.company.name}_${chatbot.project_name}_${users[0].userName}") sh -c "rm /home/botium-bindings/samples/botframework/spec/convo/*"`);
                    exec(`docker exec -d $(docker ps -aqf "name=${process.env.NODE_ENV}_${chatbot.company.name}_${chatbot.project_name}_${users[0].userName}") sh -c "rm /home/botium-bindings/samples/botframework/spec/convo/*"`, (err, stdout, stderr) => {
                        let containerIds = "";
                        users.forEach(user => {
                            containerIds = containerIds + ` $(docker ps -aqf "name=${process.env.NODE_ENV}_${user.company.name}_${chatbot.project_name}_${user.userName}") `;
                        })
                        exec(`docker stop ${containerIds} && docker rm ${containerIds}`, (err, stdout, stderr) => {
                            console.log(err);
                        });
                        res.status(200).send();
                    });
                });
            });
        })
    })
}