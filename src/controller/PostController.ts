import { Request, Response } from "express"
import { PostBusiness } from "../business/PostBusiness"
import { GetPostRequestDTO } from "../dto/PostDTO"
import { BadRequestError } from "../model/BadRequestError"
import { BaseError } from "../model/Error"


export class PostController {
    constructor(
        private postBusiness: PostBusiness
    ) { }


    public obter = async (req: Request, res: Response) => {
        try {

            if (req.headers.authorization === undefined) {
                throw new BadRequestError("Token invalido ou expirado")
            }

            const request: GetPostRequestDTO = {
                token: req.headers.authorization
            }

            const response = await this.postBusiness.getPosts(request)

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
                token: req.headers.authorization
            }

            await this.postBusiness.criar(request)

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
    
}