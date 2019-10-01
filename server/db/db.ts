// const dotenv = require('dotenv');
// dotenv.config({path: __dirname + '/.env'})
import { Request, Response, NextFunction } from "express";
import {Sequelize} from 'sequelize-typescript';
import CompanyModel from "../models/company";
import UserModel from "../models/user";
import ChatbotModel from "../models/chatbot";
import TestModel from "../models/test";
import LogModel from "../models/log";

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
            database: process.env.DB_NAME,
        });
        await this.sequelize.addModels([CompanyModel, UserModel, ChatbotModel, TestModel, LogModel]);
        await this.sequelize.sync();
    }
}