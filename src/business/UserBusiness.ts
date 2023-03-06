import { UserDatabase } from "../database/UserDataBase";
import { GetUsersDTO } from "../dto/UserDTO";
import {  User } from "../model/User";

export class UserBusiness {
    constructor(  private userDatabase: UserDatabase ) { }

    public get = async (): Promise<GetUsersDTO> => {

        const userDB = await this.userDatabase.get()

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

}