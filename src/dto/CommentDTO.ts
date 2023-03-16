
import { CommentModel } from "../types"

export interface GetCommentRequestDTO {
    token: string
}

export type GetCommentResponseDTO = CommentModel[]

