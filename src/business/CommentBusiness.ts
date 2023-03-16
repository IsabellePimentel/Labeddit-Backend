import { CommentDatabase } from "../database/CommentDataBase";
import { GetCommentRequestDTO, GetCommentResponseDTO } from "../dto/CommentDTO";
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

        const { token } = request

        let t = token.substring(7, token.length)

        const payload = this.tokenManager.getPayload(t)

        if (payload === null) {
            throw new BadRequestError("'token'inválido")
        }

        const commentDB: CommentDB[] = await this.commentDatabase.obter()



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

}