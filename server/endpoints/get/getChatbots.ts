import { Request, Response, NextFunction } from "express";
import ChatbotModel from "../../models/chatbot";

/**
 * Get chatbots
 * url : http://localhost:8080/v1/chatbots
 */
export default function getChatbots(req: Request, res: Response, next: NextFunction) {
    ChatbotModel.findAll()
    .catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
    .then((chatbots: ChatbotModel[]) => {
        res.status(200).send(chatbots);
    })
}