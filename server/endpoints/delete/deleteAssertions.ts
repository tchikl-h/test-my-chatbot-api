import { Request, Response, NextFunction } from "express";
import AssertionModel from "../../models/assertion";

/**
* Delete assertions
* url : http://localhost:8080/v1/assertion/1
*/
export default function deleteAssertions(req: Request, res: Response, next: NextFunction) {
    AssertionModel.findOne({
        where: {
            id: req.params.id,
        }
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
    .then((assertion: AssertionModel) => {
        if (!assertion) {
            res.status(404).send(`Not found: resource ${req.params.id} does not exist for assertion`)
            return;
        }
        AssertionModel.destroy({
            where: {
                id: req.params.id,
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