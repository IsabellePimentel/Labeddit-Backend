import { BaseDatabase } from "./BaseDataBase"

export class UserDatabase extends BaseDatabase{

    public static TABLE_USERS = "users"


    public async get(){

        let usersDB = await BaseDatabase.connection(UserDatabase.TABLE_USERS)
        return usersDB
    }
}