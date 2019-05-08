import { Request, Response, NextFunction } from "express";
import * as express from 'express';
import * as passport from 'passport';
import OriginHandler from '../originHandler';

export default class AuthRoutes {
    strategy: any;
    strategyName: string;
    router : any = express.Router();
    originHandler: OriginHandler;

    constructor(strategy: any, strategyName: string, originHandler: OriginHandler) {
        this.strategy = strategy;
        this.strategyName = strategyName;
        this.originHandler = originHandler;
    }

    init() {
        // middleware that is specific to this router
        this.router.use((req: Request, res: Response, next: NextFunction) => {
            // Strategy config
            passport.use(this.strategy);

            // Used to stuff a piece of information into a cookie
            passport.serializeUser((user, done) => {
                done(null, user);
            });

            // Used to decode the received cookie and persist session
            passport.deserializeUser((user, done) => {
                done(null, user);
            });
            next();
        });

        // passport.authenticate middleware is used here to authenticate the request
        let config = this.strategyName === "google" ? { scope: ['profile'] } : { failureRedirect: '/login' };
        this.router.get(`/${this.strategyName}`, passport.authenticate(this.strategyName, config));

        // The middleware receives the data from Facebook and runs the function on Strategy config
        this.router.get(`/${this.strategyName}/callback`, passport.authenticate(this.strategyName), (req, res) => {
            let token = req.headers.cookie.split(';').filter((elem) => {
                return elem.includes("connect.sid=");
            })
            res.redirect(302, `${this.originHandler.getOrigin()}?token=${String(token).split('=')[1]}`);
        });
    }

    getRouter() : any {
        return this.router;
    }
    
    // Middleware to check if the user is authenticated
    isUserAuthenticated(req: Request, res: Response, next: NextFunction) {
        if (req.user) {
            next();
        } else {
            res.send('You must login!');
        }
    }
}