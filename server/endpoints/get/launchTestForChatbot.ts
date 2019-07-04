import { Request, Response, NextFunction } from "express";
import ChatbotModel from "../../models/chatbot";
import UserModel from "../../models/user";
import CompanyModel from "../../models/company";
import { exec } from 'child_process';

/**
* Launch all the tests for the chatbot
* url : http://localhost:8080/v1/companies/1/users/1/chatbots/1/launch
*/
export default function launchTestForChabtot(req: Request, res: Response, next: NextFunction) {
    ChatbotModel.findOne({
        where: {
            id: req.params.chatbotId,
        },
        include: [CompanyModel]
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
    .then((chatbot: ChatbotModel) => {
        if (!chatbot) {
            res.status(404).send(`Not found: resource ${req.params.chatbotId} does not exist for chatbot`)
            return;
        }
        UserModel.findOne({
            where: {
                id: req.params.userId
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send(err)
        })
        .then((user: UserModel) => {
            exec(`docker start $(docker ps -aqf "name=${chatbot.company.name}_${chatbot.project_name}_${user.userName}")`, (err, stdout, stderr) => {
                var now = new Date().toISOString().substr(0, 19);
                exec(`docker exec -d $(docker ps -aqf "name=${chatbot.company.name}_${chatbot.project_name}_${user.userName}") sh -c "cd /home/botium-bindings/samples/botframework && npm run test > logs/${chatbot.company.name}/${chatbot.project_name}/${user.userName}/${now}"`, (err, stdout, stderr) => { // /logs/Amazon/Jojo/rsmith/2019-08-31_13:34:23
                    res.status(200).send();
                });
            });
        });
    })
}