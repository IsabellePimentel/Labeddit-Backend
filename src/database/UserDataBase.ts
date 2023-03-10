import { UserDB } from "../types"
import { BaseDatabase } from "./BaseDataBase"

export class UserDatabase extends BaseDatabase{

    public static TABLE_USERS = "users"


    public async obter(){

        let usersDB = await BaseDatabase.connection(UserDatabase.TABLE_USERS)
        return usersDB
    }

    public async inserirUsuario(userDB: UserDB): Promise <void>{
        await BaseDatabase.connection(UserDatabase.TABLE_USERS).insert(userDB)
    }

    public async obterPorEmail(email: string): Promise <UserDB | null>{
        const  usuario : UserDB[] = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .select()
        .where({email: email})

        if(usuario) {
            return usuario[0]
        }else {
            return null
        }
        
    }



    

}