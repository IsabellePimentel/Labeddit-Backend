
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

export interface EditCommentRequestDTO {
    id:string,
    content:string,
    token:string,
    id_comment: string
}


export interface DeleteCommentRequestDTO {
    token: string,
    id: string,
    id_comment: string
}