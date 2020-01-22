import { Request, Response, NextFunction } from "express";
import * as CryptoJS from "crypto-js";

/**
* Get password and encrypt it then return
* url : http://localhost:8080/v1/encrypt/toto
*/
export default function getEncryptPassword(req: Request, res: Response, next: NextFunction) {
    let encrypted = CryptoJS.AES.encrypt(req.params.toEncrypt, process.env.SECRET).toString();
    res.status(200).send(encrypted);
}