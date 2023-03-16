import { CommentDB } from "../types";
import { BaseDatabase } from "./BaseDataBase";

export class CommentDatabase extends BaseDatabase {

    public static TABLE_COMMENTS = "comments"
    public static TABLE_LIKES_DISLIKES = "likes_dislikes_comments"


    public obter = async (postId: string): Promise <CommentDB[]> => {
        const result: CommentDB[] = await BaseDatabase
            .connection(CommentDatabase.TABLE_COMMENTS)
            .select(
                "comments.id",
                "comments.post_id",
                "comments.user_id",
                "comments.content",
                "comments.likes",
                "comments.dislikes",
                "comments.created_at",
                "comments.updated_at",
                "users.name AS creator_name"

            )
            .join("users", "comments.user_id", "=", "users.id")
            .select()
            .where({
                "comments.post_id":postId
            })
        return result
    }

}