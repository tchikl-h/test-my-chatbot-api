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
            '/tests': endpoints.getTests
        }

        const routesPostV1 = {
            '/companies': endpoints.postCompanies,
            '/chatbots': endpoints.postChatbots,
            '/users': endpoints.postUsers,
            '/tests': endpoints.postTests,
        }

        const routesDeleteV1 = {
            '/companies/:id': endpoints.deleteCompanies,
            '/chatbots/:id': endpoints.deleteChatbots,
            '/users/:id': endpoints.deleteUsers,
            '/tests/:id': endpoints.deleteTests,
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
    }
}
