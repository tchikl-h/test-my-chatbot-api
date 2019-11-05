import { Application } from "express";
import * as endpoints from "./endpoints";

export default class Routes {

    constructor(app: Application) {
        const routesGetV1 = {
            '/chatbots/:id/tests': endpoints.getTestsByChatbot,
            '/companies/:companyId/users/:userId/chatbots': endpoints.getChatbotsByUser,
            '/companies/:id/chatbots': endpoints.getChatbotsByCompany,
            '/companies/:id/users': endpoints.getUsersByCompany,
            '/companies': endpoints.getCompanies,
            '/users': endpoints.getUsers,
            '/chatbots': endpoints.getChatbots,
            '/tests': endpoints.getTests,
            '/encrypt/:toEncrypt': endpoints.getEncryptPassword,
            '/decrypt/:toDecrypt': endpoints.getDecryptPassword,
            '/companies/:companyId/users/:userId/chatbots/:chatbotId/start': endpoints.startChatbot,
            '/companies/:companyId/users/:userId/chatbots/:chatbotId/stop': endpoints.stopChatbot,
            '/companies/:companyId/users/:userId/chatbots/:chatbotId/launch': endpoints.launchTestForChatbot,
            '/chatbots/update': endpoints.updateContainers,
        }

        const routesPostV1 = {
            '/companies': endpoints.postCompanies,
            '/chatbots': endpoints.postChatbots,
            '/users': endpoints.postUsers,
            '/tests': endpoints.postTests,
            '/logs': endpoints.postLogs,
        }

        const routesDeleteV1 = {
            '/companies/:id': endpoints.deleteCompanies,
            '/chatbots/:id': endpoints.deleteChatbots,
            '/users/:id': endpoints.deleteUsers,
            '/users/:userId/tests/:testId': endpoints.deleteTests,
        }

        const routesPatchV1 = {
            '/companies/:id': endpoints.patchCompanies,
            '/chatbots/:id': endpoints.patchChatbots,
            '/users/:id': endpoints.patchUsers,
            '/tests/:id': endpoints.patchTests,
        }

        // Setup routes get
        for (const endpoint in routesGetV1) {
            const fct = routesGetV1[endpoint];
            app.route(`/v1${endpoint}`).get(fct);
        }

        // Setup routes post
        for (const endpoint in routesPostV1) {
            const fct = routesPostV1[endpoint];
            app.route(`/v1${endpoint}`).post(fct);
        }

        // Setup routes delete
        for (const endpoint in routesDeleteV1) {
            const fct = routesDeleteV1[endpoint];
            app.route(`/v1${endpoint}`).delete(fct);
        }

        // Setup routes patch
        for (const endpoint in routesPatchV1) {
            const fct = routesPatchV1[endpoint];
            app.route(`/v1${endpoint}`).patch(fct);
        }
    }
}
