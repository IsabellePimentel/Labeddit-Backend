import { Request, Response } from "express"
import { UserBusiness } from "../business/UserBusiness"

export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ) { }


    public get = async (req: Request, res: Response) => {
        try {
            const output = await this.userBusiness.get()
            res.status(200).send(output)
        } catch (error) {
            console.log(error)
        }

    }

}