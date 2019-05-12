import { Request, Response, NextFunction } from "express";
import ChatbotModel from "../../models/chatbot";

/**
* Delete chatbot
* url : http://localhost:8080/v1/chatbots/1
*/
export default function deleteChatbots(req: Request, res: Response, next: NextFunction) {
    ChatbotModel.findOne({
        where: {
            id: req.params.id,
        }
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
            res.status(200).send();
        })
    })
}