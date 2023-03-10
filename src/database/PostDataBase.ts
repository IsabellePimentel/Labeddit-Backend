import { PostDB } from "../types";
import { BaseDatabase } from "./BaseDataBase";

export class PostDatabase extends BaseDatabase {

    public static TABLE_POSTS = "posts"


    public obter = async (): Promise <PostDB[]> => {
        const result: PostDB[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .select(
                "posts.id",
                "posts.creator_id",
                "posts.content",
                "posts.likes",
                "posts.dislikes",
                "posts.created_at",
                "posts.updated_at",
                "users.name AS creator_name"

            )
            .join("users", "posts.creator_id", "=", "users.id")

        return result
    }

    public async inserir(post: PostDB): Promise<void> {
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS).insert(post)
    }

    
    public async obterPorId(id: string ): Promise<PostDB | undefined> {
        const [postDBExist]: PostDB[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .select()
            .where({ id: id })
        return postDBExist
    }


    public async atualizar(id: string, newPostDB: PostDB): Promise<void> {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .update(newPostDB)
            .where({id})
    }

}