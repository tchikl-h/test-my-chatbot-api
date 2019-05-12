import { Request, Response, NextFunction } from "express";
import ChatbotModel from "../../models/chatbot";
import TestModel from "../../models/test";

/**
 * Get Tests from a chatbot
 * url : http://localhost:8080/v1/chatbots/1/tests
 */
export default function getTestsByChatbot(req: Request, res: Response, next: NextFunction) {
    ChatbotModel.findOne({
        where: {
            id: req.params.id
        },
        include: [TestModel]
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
    .then((chatbot: ChatbotModel) => {
        res.status(200).send(chatbot.tests);
    })
}