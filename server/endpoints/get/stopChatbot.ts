import { Request, Response, NextFunction } from "express";
import ChatbotModel from "../../models/chatbot";
import CompanyModel from "../../models/company";
import UserModel from "../../models/user";
import { exec } from 'child_process';

/**
* Stop chatbot
* url : http://localhost:8080/v1/companies/1/users/1/chatbots/1/stop
*/
export default function stopChatbot(req: Request, res: Response, next: NextFunction) {
    console.log("STOPPING CHATBOT "+req.params.chatbotId+"...");
    ChatbotModel.findOne({
        where: {
            id: req.params.chatbotId
        },
        include: [CompanyModel]
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
    .then((chatbot: ChatbotModel) => {
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
            console.log("STOP !")
            // TODO: check if the chatbot is not already stopped (to avoid refresh on the register-test page => stuck)
            exec(`docker stop $(docker ps -aqf "name=${process.env.NODE_ENV}_${chatbot.company.name}_${chatbot.project_name}_${user.userName}")`, (err, stdout, stderr) => {
                console.log(err);
            });
            res.status(200).send();
        });
    });
}