import { PostDatabase } from "../database/PostDataBase"
import { GetPostRequestDTO, GetPostResponseDTO } from "../dto/PostDTO"
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

}