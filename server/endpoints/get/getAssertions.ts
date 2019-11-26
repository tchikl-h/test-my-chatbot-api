import { Request, Response, NextFunction } from "express";
import AssertionModel from "../../models/assertion";

/**
 * Get assertions
 * url : http://localhost:8080/v1/assertions
 */
export default function getChatbots(req: Request, res: Response, next: NextFunction) {
    AssertionModel.findAll()
    .catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
    .then((assertions: AssertionModel[]) => {
        res.status(200).send(assertions);
    })
}