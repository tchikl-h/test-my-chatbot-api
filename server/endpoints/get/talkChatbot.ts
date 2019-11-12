import { Request, Response, NextFunction } from "express";
import ChatbotModel from "../../models/chatbot";
import axios from "axios";

/**
* Talk with the chatbot
* url : http://localhost:8080/v1/companies/1/users/1/chatbots/1/talk {msg: "Hello"}
*/
export default function registerTest(req: Request, res: Response, next: NextFunction) {
    ChatbotModel.findOne({
        where: {
            id: req.params.chatbotId,
        }
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
        axios.get(`${chatbot.webhook_url}`, {
            params: {
                msg: req.body.msg
            }
        })
        .then((response) => {
            res.status(200).send(response.data);
        })
        .catch((err) => {
            console.log(err);
        });
    })
}