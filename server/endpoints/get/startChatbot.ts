import { Request, Response, NextFunction } from "express";
import ChatbotModel from "../../models/chatbot";
import CompanyModel from "../../models/company";
import UserModel from "../../models/user";
import { exec } from 'child_process';

/**
* Start chatbot
* url : http://localhost:8080/v1/companies/1/users/1/chatbots/1/start
*/
export default function startChatbot(req: Request, res: Response, next: NextFunction) {
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
            console.log(`Start container ${process.env.NODE_ENV}_${chatbot.company.name.split(" ").join("-")}_${chatbot.project_name}_${user.userName}`);
            // TODO: exec catch error of display error at least
            exec(`docker start $(docker ps -aqf "name=${process.env.NODE_ENV}_${chatbot.company.name.split(" ").join("-")}_${chatbot.project_name}_${user.userName}")`, (err, stdout, stderr) => {
                console.log(err);
            });
            res.status(200).send();
        });
    });
}