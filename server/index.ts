import { Application } from "express";
import * as bodyParser from "body-parser";
import { AppConfig } from "./configs/config";
import { unCoughtErrorHandler } from "./handlers/errorHandler";
import Routes from "./routes";
import Database from "./db/db";
import AuthRoutes from "./routes/AuthRoutes";
import OriginHandler from "./originHandler";
import * as passport from 'passport';
import * as TwitterStrategy from 'passport-twitter';
import * as FacebookStrategy from 'passport-facebook';
import * as GoogleStrategy from 'passport-google-oauth20';
import * as session from 'express-session';

export default class Server {

    authRoutes: AuthRoutes;
    db: Database;
    originHandler: OriginHandler;

    constructor(app: Application, db: Database, originHandler: OriginHandler) {
        this.db = db;
        this.originHandler = originHandler;
        this.db.init().then(() => {
            this.config(app);
            var routes: Routes = new Routes(app, this.db);
        });
    }

    public config(app: Application): void {
        AppConfig();
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(unCoughtErrorHandler);
        app.use(session({secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true}))
        app.use(passport.initialize()); // Used to initialize passport
        app.use(passport.session()); // Used to persist login sessions

        let facebook = new AuthRoutes(
            new FacebookStrategy.Strategy({
                clientID: process.env.FACEBOOK_CLIENT_ID,
                clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
                callbackURL: `${process.env.HOSTNAME}/v1/auth/facebook/callback`
            },
            (accessToken, refreshToken, profile, done) => {
                this.db.addUserFacebook(profile);
                done(null, profile); // passes the profile data to serializeUser
            }),
            "facebook",
            this.originHandler
        );

        let google = new AuthRoutes(
            new GoogleStrategy.Strategy({
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: `${process.env.HOSTNAME}/v1/auth/google/callback`
            }, (accessToken, refreshToken, profile, done) => {
                this.db.addUserGoogle(profile);
                done(null, profile); // passes the profile data to serializeUser
            }),
            "google",
            this.originHandler
        );

        let twitter = new AuthRoutes(
            new TwitterStrategy.Strategy({
                consumerKey: process.env.TWITTER_CONSUMER_KEY,
                consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
                callbackURL: `${process.env.HOSTNAME}/v1/auth/twitter/callback`
            }, (accessToken, refreshToken, profile, done) => {
                this.db.addUserTwitter(profile);
                done(null, profile); // passes the profile data to serializeUser
            }),
            "twitter",
            this.originHandler
        );

        facebook.init();
        google.init();
        twitter.init();

        app.use('/v1/auth', facebook.getRouter());
        app.use('/v1/auth', google.getRouter());
        app.use('/v1/auth', twitter.getRouter());
    }
}