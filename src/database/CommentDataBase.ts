import { CommentDB, CommentInsertUpdateDB } from "../types";
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
                "comments.post_id": postId
            })
        return result
    }


    public async inserir(comment: CommentInsertUpdateDB): Promise<void> {
        await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS).insert(comment)
    }


    public async obterPorId(id: string ): Promise<CommentDB | undefined> {
        const [postDBExist]: CommentDB[] = await BaseDatabase
            .connection(CommentDatabase.TABLE_COMMENTS)
            .select()
            .where({ id: id })
        return postDBExist
    }

    public async atualizar(id: string, newCommentDB: CommentInsertUpdateDB): Promise<void> {
        await BaseDatabase
            .connection(CommentDatabase.TABLE_COMMENTS)
            .update(newCommentDB)
            .where({id})
    }


    public async deletar(id: string): Promise <void> {
        await BaseDatabase
            .connection(CommentDatabase.TABLE_COMMENTS)
            .del()
            .where({ id })
    }

}