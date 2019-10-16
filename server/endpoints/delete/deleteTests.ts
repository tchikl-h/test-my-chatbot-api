import { Request, Response, NextFunction } from "express";
import TestModel from "../../models/test";
import ChatbotModel from "../../models/chatbot";
import UserModel from "../../models/user";
import CompanyModel from "../../models/company";
import { exec } from 'child_process';
import { equal } from "assert";

/**
* Delete tests
* url : http://localhost:8080/v1/users/1/test/1
*/
export default function deleteTests(req: Request, res: Response, next: NextFunction) {
    console.log("----------> DELETE TEST with arg :"+req.params.userId+" "+req.params.testId);
    TestModel.findOne({
        where: {
            id: req.params.testId,
        },
        include: [{
            model: ChatbotModel,
            include: [CompanyModel],
        }]
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
    .then((test: TestModel) => {
        if (!test) {
            res.status(404).send(`Not found: resource ${req.params.testId} does not exist for test`)
            return;
        }
        TestModel.destroy({
            where: {
                id: req.params.testId,
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send(err)
        })
        .then(() => {
            UserModel.findOne({
                where: {
                    id: req.params.userId
                },
            })
            .catch((err) => {
                console.log(err)
                res.status(500).send(err)
            })
            .then((user: UserModel) => {
                exec(`docker start $(docker ps -aqf "name=${process.env.NODE_ENV}_${test.chatbot.company.name}_${test.chatbot.project_name}_${user.userName}")`, (err, stdout, stderr) => {
                    exec(`docker exec -d $(docker ps -aqf "name=${process.env.NODE_ENV}_${test.chatbot.company.name}_${test.chatbot.project_name}_${user.userName}") sh -c "rm /home/botium-bindings/samples/botframework/spec/convo/${test.name}.convo.txt"`, (err, stdout, stderr) => {
                        res.status(200).send();
                    });
                });
            });
        })
    })
}