import { Request, Response, NextFunction } from "express";
import LogModel from "../../models/log";

/**
 * Get logs
 * url : http://localhost:8080/v1/logs
 */
export default function getLogs(req: Request, res: Response, next: NextFunction) {
    LogModel.findAll()
    .catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
    .then((logs: LogModel[]) => {
        res.status(200).send(logs);
    })
}