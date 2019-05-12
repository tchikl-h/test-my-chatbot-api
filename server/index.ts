import { Application } from "express";
import * as bodyParser from "body-parser";
import { AppConfig } from "./configs/config";
import { unCoughtErrorHandler } from "./handlers/errorHandler";
import Routes from "./routes";
import Database from "./db/db";

export default class Server {

    db: Database;

    constructor(app: Application, db: Database) {
        this.db = db;
        this.db.init().then(() => {
            this.config(app);
            var routes: Routes = new Routes(app);
        });
    }

    public config(app: Application): void {
        AppConfig();
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
    }
}