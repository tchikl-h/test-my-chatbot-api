// const dotenv = require('dotenv');
// dotenv.config({path: __dirname + '/.env'})
import { Request, Response, NextFunction } from "express";
import {Sequelize} from 'sequelize-typescript';
import CompanyModel from "../models/company";
import UserModel from "../models/user";
import ChatbotModel from "../models/chatbot";
import * as url from 'url';
// remove const below
const uppercase = require('upper-case');
const apiAdapter = require('./apiAdapter');
const api = apiAdapter(process.env.REDIRECT_HOST);

export default class Database {
    sequelize: Sequelize;

    /*
        initialize the models
    */
    constructor() {
    }

    public async init(){
        this.sequelize = new Sequelize({
            dialect: 'postgres',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        });
        await this.sequelize.addModels([CompanyModel, UserModel, ChatbotModel]);
        await this.sequelize.sync();
    }

    /**
     * Get companies
     * url : http://localhost:8000/v1/companies
     */
    public getCompanies(req: Request, res: Response, next: NextFunction) {
        CompanyModel.findAll({
                attributes: ['id', 'name', 'chatbots', 'users']
            })
            .catch(console.log)
            .then((companies : CompanyModel[]) => {
                res.status(200).send(companies);
            })
    }

    // TODO : factoriser les 3 methodes suivantes en 1 seul
    /**
     * Add the user infos from the facebook profile
     */
    public addUserFacebook(profile: any) { // change type any to Profile
        UserModel.findOne({
            attributes: ['user_id'],
            where: {
                user_id: String(profile.id)
             }
        })
        .catch(console.log)
        .then((res : UserModel) => {
            if (!res) {
                return UserModel.create({
                    user_id: String(profile.id), // / ! \ les ids peuvent être les mêmes d'un compte fb à un compte twitter, 1 chance sur 1 milliard mais quand même
                    name: profile.displayName,
                    date_update: new Date(), // date return null somehow
                });
            }
        })
    }

    /**
     * Add the user infos from the google profile
     */
    public addUserGoogle(profile: any) { // change type any to Profile
        UserModel.findOne({
            attributes: ['user_id'],
            where: {
                user_id: profile.id
             }
        })
        .catch(console.log)
        .then((res : UserModel) => {
            if (!res) {
                return UserModel.create({
                    user_id: profile.id,
                    name: profile.displayName,
                    date_update: new Date(), // date return null somehow
                });
            }
        })
    }

    /**
     * Add the user infos from the twitter profile
     */
    public addUserTwitter(profile: any) { // change type any to Profile
        UserModel.findOne({
            attributes: ['user_id'],
            where: {
                user_id: String(profile.id)
             }
        })
        .catch(console.log)
        .then((res : UserModel) => {
            if (!res) {
                return UserModel.create({
                    user_id: String(profile.id),
                    name: profile.displayName,
                    date_update: new Date(), // date return null somehow
                });
            }
        });
    }
}