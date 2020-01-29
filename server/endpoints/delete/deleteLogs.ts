import { Request, Response, NextFunction } from "express";
import TestModel from "../../models/test";

/**
* Delete tests
* url : http://localhost:8080/v1/logs
*/
export default function deleteLogs(req: Request, res: Response, next: NextFunction) {
    TestModel.findOne({
        where: {
            id: req.params.id,
        }
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
    .then((test: TestModel) => {
        if (!test) {
            res.status(404).send(`Not found: resource ${req.params.testId} does not exist for test`)
            return;
        }
        TestModel.destroy({
            where: {
                id: req.params.testId,
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send(err)
        })
        .then(() => {
            res.status(200).send();
        })
    })
}