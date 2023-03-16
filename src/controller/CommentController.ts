import { CommentBusiness } from "../business/CommentBusiness";
import { BadRequestError } from "../model/BadRequestError";
import { Request, Response } from "express"
import { BaseError } from "../model/Error";
import { GetCommentRequestDTO } from "../dto/CommentDTO";

export class CommentController {
    constructor(
        private commentBusiness: CommentBusiness
    ) { }


    public obter = async (req: Request, res: Response) => {
        try {

            if (req.headers.authorization === undefined) {
                throw new BadRequestError("Token invalido ou expirado")
            }

            const request: GetCommentRequestDTO = {
                token: req.headers.authorization
            }

            const response = await this.commentBusiness.getComments(request)

            res.status(200).send(response)

        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }
    
}