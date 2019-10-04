import * as dotenv from "dotenv";
dotenv.config()
import * as express from "express";
import { Application } from "express";
import { NextFunction, Request, Response, Router } from "express";
import * as cors from "cors";
import Server from "./server/index";
import Database from "./server/db/db";
import OriginHandler from "./server/originHandler";

class App {
    public app: Application = express();
    public db: Database = new Database();
    public server: Server;
    public originHandler: OriginHandler = new OriginHandler();

    constructor() {

        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', "*");
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS,HEAD');
            res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
            next();
        });

        this.app.use(cors(this.originHandler.initCorsOptions()));

        // middleware to check the admin token in the header authorization
        this.app.use("*", (req: Request, res: Response, next: NextFunction) => {
            if (req.headers.authorization && req.headers.authorization === process.env.ADMIN_TOKEN) {
                next();
            } else {
                res.status(401).send({
                    msg: "Need an admin token.",
                });
            }
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