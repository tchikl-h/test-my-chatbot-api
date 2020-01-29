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
    public http = require("http").Server(this.app);
    public io = require('socket.io').listen(this.http);
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
            if (req.headers.authorization && req.headers.authorization === process.env.ADMIN_TOKEN ||
                req.params['0'].match(/^\/v1\/companies\/\d+\/users\/\d+\/chatbots\/\d+\/response$/)) {
                next();
            } else {
                res.status(401).send({
                    msg: "Need an admin token.",
                });
            }
        });

        this.io.on('connect', (socket) => {
            socket.on('room', (room) => {
                socket.join(room, () => {
                    // console.log("User joined on room "+room);
                    socket.in(room).on('message:test', (msg) => {
                        this.io.in(room).emit('message:test', msg);
                    })
        
                    socket.in(room).on('message:talk', (msg) => {
                        // console.log("---------------SERVERSOCKET MESSAGE:TALK RECEIVED---------------");
                        this.io.in(room).emit('message:talk', msg);
                    })
        
                    socket.in(room).on('test', (msg) => {
                        this.io.in(room).emit('test', msg);
                    })
        
                    socket.in(room).on('talk', (msg) => {
                        // console.log("---------------SOCKETSERVER TALK RECEIVED---------------");
                        this.io.in(room).emit('talk', msg);
                    })
                });
            });
            // socket.on('user:request', () => {
            //   userCount++;
            //   socket.emit('user:accept', { id : userId, users : userCount });
            //   userId++;
            //   socket.broadcast.emit('user:join');
            // });
          
            // // 1) receive bot
            // socket.on('send:message:bot', function(msg) {
            //   // 2) send bot
            //   io.emit('send:message:bot', msg);
            // });
          });

        this.server = new Server(this.app, this.db);
        const port: number = +process.env.PORT || 8080;

        this.http.listen(port, function (err: any) {
            if (err) return err;
            console.info(`Server listening PORT:${port}`);
        });
    }
}

export default new App().app;