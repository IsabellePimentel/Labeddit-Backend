import { CommentDatabase } from "../database/CommentDataBase";
import { CreateCommentRequestDTO, EditCommentRequestDTO, GetCommentRequestDTO, GetCommentResponseDTO } from "../dto/CommentDTO";
import { BadRequestError } from "../model/BadRequestError";
import { Comment } from "../model/Comment";
import { IdGenerator } from "../service/IdGenerator";
import { TokenManager } from "../service/TokenManager";
import { CommentDB } from "../types";

export class CommentBusiness {
    constructor(
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator,
        private commentDatabase: CommentDatabase
    ) { }




    public getComments = async (request: GetCommentRequestDTO): Promise<GetCommentResponseDTO> => {

        const { token, post_id } = request

        let t = token.substring(7, token.length)

        const payload = this.tokenManager.getPayload(t)

        if (payload === null) {
            throw new BadRequestError("'token'inválido")
        }

        const commentDB: CommentDB[] = await this.commentDatabase.obter(post_id)



        const comments = commentDB.map((p) => {
            const comment = new Comment(
                p.id,
                p.post_id,
                p.content,
                p.likes,
                p.dislikes,
                p.created_at,
                p.updated_at,
                p.user_id,
                p.creator_name

            )

            return comment.toBusinessModel()

        }
        )

        const output: GetCommentResponseDTO = comments
        return output
    }



    public criar = async (request: CreateCommentRequestDTO): Promise<void> => {

        const { content, token, id } = request

        let t = token.substring(7, token.length)

        const payload = this.tokenManager.getPayload(t)

        if (payload === null) {
            throw new BadRequestError("'token'inválido")
        }

        const idComment = this.idGenerator.generate()

        const creatorId = payload.id
        const creatorName = payload.name

        const newComment = new Comment(
            idComment,
            id,
            content,
            0, // likes
            0, // dislikes
            new Date().toISOString(),
            new Date().toISOString(),
            creatorId,
            creatorName
        )

        const comment = newComment.toDBModel()

        await this.commentDatabase.inserir(comment)
    }


    public editar = async (request: EditCommentRequestDTO): Promise<void> => {

        const { content, token, id_comment } = request

        let t = token.substring(7, token.length)

        const payload = this.tokenManager.getPayload(t)

        if (payload === null) {
            throw new BadRequestError("'token'inválido")
        }

        const commentDB = await this.commentDatabase.obterPorId(id_comment)

        if (!commentDB) {
            throw new BadRequestError("Post não encontrado")
        }

        const creatorName = payload.name

        const newComment = new Comment(
            commentDB.id,
            commentDB.post_id,
            commentDB.content,
            commentDB.likes,
            commentDB.dislikes,
            commentDB.created_at,
            commentDB.updated_at,
            commentDB.user_id,
            creatorName
        )

        newComment.setContent(content)
        newComment.setUpdatedAt(new Date().toISOString())

        const comment = newComment.toDBModel()

        await this.commentDatabase.atualizar(id_comment, comment)
    }

}