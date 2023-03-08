import { Request, Response } from "express"
import { UserBusiness } from "../business/UserBusiness"
import { LoginRequestDTO, SignupRequestDTO, SignupResponseDTO } from "../dto/UserDTO"
import { BaseError } from "../model/Error"

export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ) { }


    public obter = async (req: Request, res: Response) => {
        try {
            const response = await this.userBusiness.obter()
            res.status(200).send(response)
        } catch (error) {
            console.log(error)

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public signup = async (req: Request, res: Response) => {

        try {
            const request: SignupRequestDTO = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }

            const response: SignupResponseDTO = await this.userBusiness.signup(request)

            res.status(201).send(response)
        } catch (error) {
            console.log(error)

    
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }


    public login = async (req: Request, res: Response) => {
        try {
            const request: LoginRequestDTO = {
                email: req.body.email,
                password: req.body.password
            }

            const response = await this.userBusiness.login(request)

            res.status(200).send(response)

        } catch (error) {
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }


}