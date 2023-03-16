
import { CommentModel } from "../types"

export interface GetCommentRequestDTO {
    token: string
    post_id: string
}

export type GetCommentResponseDTO = CommentModel[]

export interface CreateCommentRequestDTO {
    token: string,
    content: string,
    id: string
}