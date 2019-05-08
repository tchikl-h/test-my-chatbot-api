import { Application, Request, Response, NextFunction, Router } from "express";
import Database from './db/db';

export default class Routes {

    constructor(app: Application, db: Database) {
        const routesGetV1 = {
            '/company': db.getCompanies,
        }

        const routesPostV1 = {
        }

        const routesDeleteV1 = {
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
