import { CommentBusiness } from "../business/CommentBusiness";
import { BadRequestError } from "../model/BadRequestError";
import { Request, Response } from "express"
import { BaseError } from "../model/Error";
import { EditCommentRequestDTO, GetCommentRequestDTO } from "../dto/CommentDTO";

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
                token: req.headers.authorization,
                post_id: req.params.id
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



    public criar = async (req: Request, res: Response) => {
        try {

            if (req.headers.authorization === undefined) {
                throw new BadRequestError("Token invalido ou expirado")
            }

            const request = {
                content: req.body.content,
                token: req.headers.authorization,
                id: req.params.id
            }

            await this.commentBusiness.criar(request)

            res.status(201).end()

        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }


    public editar = async (req: Request, res: Response) => {
        try {

            if (req.headers.authorization === undefined) {
                throw new BadRequestError("Token invalido ou expirado")
            }

            const request: EditCommentRequestDTO = {
                id: req.params.id,
                content: req.body.content,
                token: req.headers.authorization,
                id_comment: req.params.id_comment
            }

            await this.commentBusiness.editar(request)

            res.status(200).end()

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