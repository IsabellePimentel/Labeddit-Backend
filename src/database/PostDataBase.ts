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

}