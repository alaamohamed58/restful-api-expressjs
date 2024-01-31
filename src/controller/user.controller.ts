import { Request, Response } from "express";
import {omit} from 'lodash'
import logger from "../utils/logger"
import { createUser } from "../service/user.service";
import { CreateUserInput } from "../schema/user.schema";


export async function createUserHandler(req: Request<{}, {}, CreateUserInput["body"]>, res: Response) {
    try {
        const user = await createUser(req.body)
        const sanitizedUser = omit(user.toJSON(), "password", "__v"); 

        return res.send(sanitizedUser)
    } catch (err: any) {
        logger.error(err)

        return res.status(409).send(err.message)
    }

}