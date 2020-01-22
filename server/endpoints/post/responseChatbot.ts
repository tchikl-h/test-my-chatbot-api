import { Request, Response, NextFunction } from "express";
import ChatbotModel from "../../models/chatbot";

const io = require("socket.io-client");
let socket = io.connect(process.env.HOST_API);

/**
* Response from the chatbot
* url : http://localhost:8080/v1/companies/1/users/1/chatbots/1/response {message: "Hello", intent: "Welcome"}
*/
let isTestLaunched = true;

socket.on('talk', () => isTestLaunched = false);
socket.on('test', () => isTestLaunched = true);

export default function ResponseChatbot(req: Request, res: Response, next: NextFunction) {
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
        if (isTestLaunched) {
            socket.emit('message:test', {
                msg: req.body.params.msg,
                intent: req.body.params.intent,
                userInput: req.body.params.userInput
            });
        }
        else {
            socket.emit('message:talk', {
                msg: req.body.params.msg,
                intent: req.body.params.intent
            });
        }
        res.status(200).send();
    })
}