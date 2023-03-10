import { UserDatabase } from "../database/UserDataBase";
import { GetUsersDTO, LoginRequestDTO, LoginResponseDTO, SignupRequestDTO, SignupResponseDTO } from "../dto/UserDTO";
import { BadRequestError } from "../model/BadRequestError";
import {  User } from "../model/User";
import { IdGenerator } from "../service/IdGenerator";
import { TokenManager } from "../service/TokenManager";
import { USER_ROLES, TokenPayload  } from "../types";

const bcrypt = require("bcrypt");

export class UserBusiness {
    constructor(  private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager ) { }

    public login = async (request: LoginRequestDTO): Promise<LoginResponseDTO> => {
        const { email, password } = request

        if(email === undefined || email === null || email === "") {
            throw new BadRequestError("Email é obrigatório")
        }

        if(password === undefined || password === null || password === "") {
            throw new BadRequestError("Password é obrigatório")
        }

        const userDB = await this.userDatabase.obterPorEmail(email)

        if (!userDB) {
            throw new BadRequestError("usuário não encontrado")
        }

        const user = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role,
            userDB.created_at
        )

        const result = bcrypt.compareSync(password, userDB.password);

        if (!result) {
            throw new BadRequestError("password incorreto")
        }

        const tokenPayload: TokenPayload = {
            id: user.getId(),
            name: user.getName(),
            role: user.getRole()
        }

        const token = this.tokenManager.createToken(tokenPayload)

        const output: LoginResponseDTO = {
            token
        }

        return output
    }
        

    public obter = async (): Promise<GetUsersDTO> => {

        const userDB = await this.userDatabase.obter()

        const users = userDB.map((userDB) => {
            const user = new User(
                userDB.id,
                userDB.name,
                userDB.email,
                userDB.password,
                userDB.role,
                userDB.created_at
             )
            return user.toBusinessModel()
        })

        const output: GetUsersDTO = users

        return output
    }

    public signup = async (request: SignupRequestDTO): Promise<SignupResponseDTO> => {
        const { name, email, password } = request

        if(name === undefined || name === null || name === "") {
            throw new BadRequestError("Name é obrigatório")
        }

        if(email === undefined || email === null || email === "") {
            throw new BadRequestError("Email é obrigatório")
        }

        if(password === undefined || password === null || password === "") {
            throw new BadRequestError("Password é obrigatório")
        }

        const hashPass = bcrypt.hashSync(password, 5);

        const newUser = new User(
            this.idGenerator.generate(),
            name,
            email,
            hashPass,
            USER_ROLES.NORMAL, // só é possível criar users com contas normais
            new Date().toISOString()
        )

        const userDB = newUser.toDBModel()
        await this.userDatabase.inserirUsuario(userDB)


        const tokenPayload: TokenPayload = {
            id: newUser.getId(),
            name: newUser.getName(),
            role: newUser.getRole()
        }
        const token = this.tokenManager.createToken(tokenPayload)

        const output: SignupResponseDTO = {
            token
        }

        return output
    }

}