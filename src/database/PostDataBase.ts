import { LikeDislikePostDB } from "../dto/PostDTO";
import { PostDB } from "../types";
import { BaseDatabase } from "./BaseDataBase";

export class PostDatabase extends BaseDatabase {

    public static TABLE_POSTS = "posts"
    public static TABLE_LIKES_DISLIKES = "likes_dislikes"

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

    public async deletar(id: string): Promise <void> {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .del()
            .where({ id })
    }


    public obterLike = async (likeDislike: LikeDislikePostDB): Promise <number | null> =>{
        const [likeDislikeDB]: LikeDislikePostDB[] = await BaseDatabase
        .connection(PostDatabase.TABLE_LIKES_DISLIKES)
        .select()
        .where({
            user_id: likeDislike.user_id,
            post_id: likeDislike.post_id
        })

        if(likeDislikeDB){
            return likeDislikeDB.like
        }else{
            return null
        }
    }  


    public removerLikeDislike = async (like: LikeDislikePostDB): Promise <void> =>{
        await BaseDatabase
        .connection(PostDatabase.TABLE_LIKES_DISLIKES)
        .delete()
        .where({
            user_id: like.user_id,
            post_id: like.post_id
        })
    }
    public atualizarLikeDislike = async (like: LikeDislikePostDB): Promise <void> =>{
        await BaseDatabase
        .connection(PostDatabase.TABLE_LIKES_DISLIKES)
        .update(like)
        .where({
            user_id: like.user_id,
            post_id: like.post_id
        })
    }

    public inserirLikeDislike = async (like: LikeDislikePostDB): Promise <void> =>{
        await BaseDatabase
        .connection(PostDatabase.TABLE_LIKES_DISLIKES)
        .insert(like)
    }


}