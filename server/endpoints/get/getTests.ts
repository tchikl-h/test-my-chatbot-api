import { Request, Response, NextFunction } from "express";
import TestModel from "../../models/test";

/**
 * Get tests
 * url : http://localhost:8080/v1/tests
 */
export default function getChatbots(req: Request, res: Response, next: NextFunction) {
    TestModel.findAll()
    .catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
    .then((tests: TestModel[]) => {
        res.status(200).send(tests);
    })
}