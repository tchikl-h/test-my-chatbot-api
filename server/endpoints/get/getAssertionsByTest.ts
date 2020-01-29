import { Request, Response, NextFunction } from "express";
import TestModel from "../../models/test";
import AssertionModel from "../../models/assertion";

/**
 * Get Assertions from a test
 * url : http://localhost:8080/v1/tests/1/assertions
 */
export default function getAssertionsByTest(req: Request, res: Response, next: NextFunction) {
    TestModel.findOne({
        where: {
            id: req.params.id
        },
        include: [AssertionModel]
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
    .then((test: TestModel) => {
        res.status(200).send(test.assertions);
    })
}