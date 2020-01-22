import { Request, Response, NextFunction } from "express";
import * as CryptoJS from "crypto-js";

/**
* Get password and decrypt it then return
* url : http://localhost:8080/v1/decrypt/toto
*/
export default function getDecryptPassword(req: Request, res: Response, next: NextFunction) {
    var bytes  = CryptoJS.AES.decrypt(req.params.toDecrypt, process.env.SECRET);
    var decrypted = bytes.toString(CryptoJS.enc.Utf8);
    res.status(200).send(JSON.parse(decrypted));
}