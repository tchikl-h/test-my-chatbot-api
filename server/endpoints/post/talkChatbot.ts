import { Request, Response, NextFunction } from "express";
import ChatbotModel from "../../models/chatbot";
import axios from "axios";

const io = require("socket.io-client");

/**
* Talk with the chatbot
* url : http://localhost:8080/v1/companies/1/users/1/chatbots/1/talk {message: "Hello"}
*/
export default function TalkChatbot(req: Request, res: Response, next: NextFunction) {
    let socketio = io.connect(process.env.HOST_API);
    socketio.on('connect', () => {
        socketio.emit('room', req.params.chatbotId);
    });
    socketio.emit('talk');
    // console.log("---------------TALKCHATBOT---------------");
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
        axios({
            method: 'post',
            url: chatbot.webhook_url,
            data: {
                msg: req.body.message
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