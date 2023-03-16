import { PostDatabase } from "../database/PostDataBase"
import { GetPostRequestDTO, GetPostResponseDTO, CreatePostRequestDTO, EditPostRequestDTO, DeletePostRequestDTO, LikeRequestDTO, LikeDislikePostDB } from "../dto/PostDTO"
import { BadRequestError } from "../model/BadRequestError"
import { TokenManager } from "../service/TokenManager"
import { PostDB } from "../types"
import { Post } from "../model/Post"
import { IdGenerator } from "../service/IdGenerator"

export class PostBusiness {
    constructor(
        private tokenManager: TokenManager,
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator
    ) { }


    public getPosts = async (request: GetPostRequestDTO): Promise<GetPostResponseDTO> => {

        const { token } = request

        let t = token.substring(7, token.length)

        const payload = this.tokenManager.getPayload(t)

        if (payload === null) {
            throw new BadRequestError("'token'inválido")
        }

        const postDB: PostDB[] = await this.postDatabase.obter()


        const posts = postDB.map((p) => {
            const post = new Post(
                p.id,
                p.content,
                p.likes,
                p.dislikes,
                p.created_at,
                p.updated_at,
                p.creator_id,
                p.creator_name

            )

            return post.toBusinessModel()

        }
        )

        const output: GetPostResponseDTO = posts
        return output
    }


    public criar = async (request: CreatePostRequestDTO): Promise<void> => {

        const { content, token } = request

        let t = token.substring(7, token.length)

        const payload = this.tokenManager.getPayload(t)

        if (payload === null) {
            throw new BadRequestError("'token'inválido")
        }

        const id = this.idGenerator.generate()

        const creatorId = payload.id
        const creatorName = payload.name

        const newPost = new Post(
            id,
            content,
            0, // likes
            0, // dislikes
            new Date().toISOString(),
            new Date().toISOString(),
            creatorId,
            creatorName
        )

        const post = newPost.toDBModel()

        await this.postDatabase.inserir(post)
    }

    public deletar = async (request: DeletePostRequestDTO): Promise<void> => {

        const { id, token } = request

        let t = token.substring(7, token.length)

        const payload = this.tokenManager.getPayload(t)

        if (payload === null) {
            throw new BadRequestError("'token'inválido")
        }

        const post = await this.postDatabase.obterPorId(id)

        if (!post) {

            throw new BadRequestError("Id não encontrado")
        }

        await this.postDatabase.deletar(id)

    }

    public editar = async (request: EditPostRequestDTO): Promise<void> => {

        const { id, content, token } = request

        let t = token.substring(7, token.length)

        const payload = this.tokenManager.getPayload(t)

        if (payload === null) {
            throw new BadRequestError("'token'inválido")
        }

        const postDB = await this.postDatabase.obterPorId(id)

        if (!postDB) {
            throw new BadRequestError("Post não encontrado")
        }

        const creatorName = payload.name

        const newPost = new Post(
            postDB.id,
            postDB.content,
            postDB.likes,
            postDB.dislikes,
            postDB.created_at,
            postDB.updated_at,
            postDB.creator_id,
            creatorName
        )

        newPost.setContent(content)
        newPost.setUpdatedAt(new Date().toISOString())

        const post = newPost.toDBModel()

        await this.postDatabase.atualizar(id, post)
    }


    public like = async (request: LikeRequestDTO): Promise<void> => {

        const { id, token, like } = request
        
        let t = token.substring(7, token.length)

        const payload = this.tokenManager.getPayload(t)

        if (payload === null) {
            throw new BadRequestError("'token'inválido")
        }

        if (typeof like !== "boolean") {
            throw new BadRequestError("'like' deve ser um booleano")
        }

        const postDB = await this.postDatabase.obterPorId(id)

        if (!postDB) {
            throw new BadRequestError("Post não encontrado")
        }

        const likeDislikePostDB: LikeDislikePostDB = {
            user_id: payload.id,
            post_id: postDB.id,
            like: like ? 1 : 0
        }

        const post = new Post(
            postDB.id,
            postDB.content,
            postDB.likes,
            postDB.dislikes,
            postDB.created_at,
            postDB.updated_at,
            postDB.creator_id,
            postDB.creator_name
        )

        const likeDislikeExist = await this.postDatabase
            .obterLike(likeDislikePostDB)
        
        if (likeDislikeExist === 1) {
            if (like) {
                await this.postDatabase.removerLikeDislike(likeDislikePostDB)
                post.setLikes( post.getLikes() - 1)
            } else {
                await this.postDatabase.atualizarLikeDislike(likeDislikePostDB)
                post.setDislikes( post.getDislikes() + 1)
                post.setLikes( post.getLikes() - 1)
            }
        } else if (likeDislikeExist === 0) {
            if (like) {
                await this.postDatabase.atualizarLikeDislike(likeDislikePostDB)
                post.setDislikes( post.getDislikes() - 1)
                post.setLikes( post.getLikes() + 1)
            } else {
                await this.postDatabase.removerLikeDislike(likeDislikePostDB)
                post.setDislikes( post.getDislikes() - 1)
            }
        } else {
            await this.postDatabase.inserirLikeDislike(likeDislikePostDB)
            if(like) {
                post.setLikes( post.getLikes() + 1) 
             }else{
                post.setDislikes( post.getDislikes() + 1)
             } 
        }

        const updatePostDB = post.toDBModel()

        await this.postDatabase.atualizar(id, updatePostDB)
    }

}