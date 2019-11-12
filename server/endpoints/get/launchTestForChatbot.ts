import { Request, Response, NextFunction } from "express";
import ChatbotModel from "../../models/chatbot";

/**
* Launch all the tests for the chatbot
* url : http://localhost:8080/v1/companies/1/users/1/chatbots/1/launch
*/
export default function launchTestForChabtot(req: Request, res: Response, next: NextFunction) {
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
        res.status(200).send();
    })
}