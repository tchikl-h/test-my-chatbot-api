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
            '/assertions': endpoints.getAssertions,
            '/tests/:id/assertions': endpoints.getAssertionsByTest,
            '/encrypt/:toEncrypt': endpoints.getEncryptPassword,
            '/decrypt/:toDecrypt': endpoints.getDecryptPassword,
            '/companies/:companyId/users/:userId': endpoints.getUserById,
            '/companies/:companyId/users/:userId/chatbots/:chatbotId/tests/:testId/launch': endpoints.launchAllTestForChatbot,
        }

        const routesPostV1 = {
            '/companies': endpoints.postCompanies,
            '/chatbots': endpoints.postChatbots,
            '/users': endpoints.postUsers,
            '/tests': endpoints.postTests,
            '/assertions': endpoints.postAssertions,
            '/logs': endpoints.postLogs,
            '/companies/:companyId/users/:userId/chatbots/:chatbotId/talk': endpoints.talkChatbot,
            '/companies/:companyId/users/:userId/chatbots/:chatbotId/response': endpoints.responseChatbot,
        }

        const routesDeleteV1 = {
            '/companies/:id': endpoints.deleteCompanies,
            '/chatbots/:id': endpoints.deleteChatbots,
            '/users/:id': endpoints.deleteUsers,
            '/users/:userId/tests/:testId': endpoints.deleteTests,
            '/assertions/:id': endpoints.deleteAssertions,
        }

        const routesPatchV1 = {
            '/companies/:id': endpoints.patchCompanies,
            '/chatbots/:id': endpoints.patchChatbots,
            '/users/:id': endpoints.patchUsers,
            '/tests/:id': endpoints.patchTests,
            '/assertions/:id': endpoints.patchAssertions,
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
