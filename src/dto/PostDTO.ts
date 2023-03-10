import { PostModel } from "../types"

export interface GetPostRequestDTO {
    token: string
}

export type GetPostResponseDTO = PostModel[]

export interface CreatePostRequestDTO {
    token: string,
    content: string
}