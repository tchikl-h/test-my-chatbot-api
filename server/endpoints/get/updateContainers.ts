import { Request, Response, NextFunction } from "express";
import ChatbotModel from "../../models/chatbot";
import UserModel from "../../models/user";
import CompanyModel from "../../models/company";
import { exec } from 'child_process';

/**
* Update containers for every companies when the image tchikladze/chatbot has been updated
* url : http://localhost:8080/v1/chatbots/update
*/
export default function updateContainer(req: Request, res: Response, next: NextFunction) {
    ChatbotModel.findAll()
    .catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
    .then((chatbots: ChatbotModel[]) => {
        chatbots.forEach((chatbot: ChatbotModel) => {
            // create a container for all the users in the company
            UserModel.findAll({
                where: {
                    companyId: chatbot.companyId
                },
                include: [CompanyModel]
            })
            .catch((err) => {
                console.log(err)
                res.status(500).send(err)
            })
            .then((users: UserModel[]) => {
                users.forEach(user => {
                    console.log(`docker ps -aqf "name=${process.env.NODE_ENV}_${user.company.name}_${chatbot.project_name}_${user.userName}"`);
                    exec(`docker ps -aqf "name=${process.env.NODE_ENV}_${user.company.name}_${chatbot.project_name}_${user.userName}"`, (err, stdout, stderr) => {
                        if (err)
                            console.log(err);
                        exec(`docker stop ${stdout}`, (err, stdout, stderr) => {
                            if (err)
                                console.log(err);
                            else
                            console.log(`docker stop ${stdout}`);
                            exec(`docker rm ${stdout}`, (err, stdout, stderr) => {
                                if (err)
                                    console.log(err);
                                else
                                console.log(`docker rm ${stdout}`);
                            });
                        });
                    });
                })
                let users_mail = users.map(user => {
                    if (user.chatbotIds.includes(chatbot.id))
                        return user.mail
                }).join(";");
                users.forEach(user => {
                    let crontab = "(echo '0 *" + (chatbot.periodic_build !== null ? `/${chatbot.periodic_build}` : "") + " * * * cd /home/botium-bindings/samples/botframework && npm run test >/dev/null 2>&1') | crontab - ; ";
                    exec(`docker create -v ${process.env.NODE_ENV}_${user.company.name}_${chatbot.project_name}:/home/botium-bindings/samples/botframework/spec/convo --name ${process.env.NODE_ENV}_${user.company.name}_${chatbot.project_name}_${user.userName} -e PROJECTNAME='${chatbot.project_name}' -e CONTAINERMODE='dialogflow' -e DIALOGFLOW_PROJECT_ID='${chatbot.dialogflow_project_id}' -e DIALOGFLOW_CLIENT_EMAIL='${chatbot.dialogflow_client_email}' -e DIALOGFLOW_PRIVATE_KEY='${chatbot.dialogflow_private_key}' -e NODE_ENV='${process.env.NODE_ENV}' -e COMPANY_ID='${chatbot.companyId}' -e CHATBOT_ID='${chatbot.id}' -e USER_ID='${user.id}' -e HOST='${process.env.HOST}' -e HOST_API='${process.env.HOST_API}' -e MY_MAIL='${process.env.MY_MAIL}' -e MY_MAIL_PASSWORD='${process.env.MY_MAIL_PASSWORD}' -e USERS_EMAIL='${users_mail}' -e ADMIN_TOKEN='${process.env.ADMIN_TOKEN}' tchikladze/chatbot:latest sh -c "${crontab} service cron restart ; cd /home/botium-bindings/samples/botframework/node_modules/jasmine ; npm run dotenvInit ; cd /home/botium-bindings/samples/botframework/node_modules/botium-cli ; npm run dotenvInit ; cd ../.. ; mkdir -p logs/${user.company.name}/${chatbot.project_name}/${user.userName} ; npm run generateBotium && npm run emulator"`, (err, stdout, stderr) => {
                        if (err)
                            console.log(err);
                    });
                })
            });
        })
    });
    res.status(200).send();
}