import { Request, Response, NextFunction } from "express";
import LogModel from "../../models/log";
import UserModel from "../../models/user";
import ChatbotModel from "../../models/chatbot";
import * as nodemailer from 'nodemailer';

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MY_MAIL,
    pass: process.env.MY_MAIL_PASSWORD
  }
});

/**
* Post Logs
* url : http://localhost:8080/v1/logs {"logs": "Error: line 12", "coverage": "56/89", "chatbotId": 10, "companyId": 1}
*/
export default function postLogs(req: Request, res: Response, next: NextFunction) {
    LogModel.create({
        logs: req.body.logs,
        coverage: req.body.coverage,
        chatbotId: parseInt(req.body.chatbotId),
        created_at: new Date(),
        date_update: new Date(),
        deleted_at: null,
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
    .then((log: LogModel) => {
        ChatbotModel.findOne({
            where: {
                id: req.body.chatbotId
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send(err)
        })
        .then((chatbot: ChatbotModel) => {
            UserModel.findAll({
                where: {
                    chatbotIds: { $contains: [req.body.chatbotId] }
                }
            })
            .catch((err) => {
                console.log(err)
                res.status(500).send(err)
            })
            .then((users: UserModel[]) => {
                users.forEach(user => {
                  var mailOptions = {
                      from: 'herve.tchikladze@gmail.com',
                      to: user.mail,
                      subject: `[Test-my-chatbot] Error on chatbot ${chatbot.project_name}`,
                      text: `${req.body.logs}\n${process.env.HOST}/chatbot/${req.body.chatbotId}`
                  };
                
                  transporter.sendMail(mailOptions, function(error, info){
                      if (error) {
                          console.log(error);
                      } else {
                          console.log('Email sent: ' + info.response);
                      }
                  });
                });
                res.status(200).send(users);
            })
        });
    });
}