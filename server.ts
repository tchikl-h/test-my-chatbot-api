import * as dotenv from "dotenv";
dotenv.config({path: __dirname + '/.env'})
import * as express from "express";
import { Application } from "express";

import Server from "./server/index";
import Database from "./server/db/db";

class App {
    public app: Application = express();
    public db: Database = new Database();
    public server: Server;

    constructor() {

        this.app.use(function(req, res, next) {
            res.header('Access-Control-Allow-Origin', "*");
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS,HEAD');
            res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
            next();
        });

        this.server = new Server(this.app, this.db);
        const port: number = +process.env.PORT || 8080;

        this.app.listen(port, function (err: any) {
            if (err) return err;
            console.info(`Server listening PORT:${port}`);
        });
    }
}

export default new App().app;