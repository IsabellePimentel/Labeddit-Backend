import { PostModel } from "../types"

export interface GetPostRequestDTO {
    token: string
}

export type GetPostResponseDTO = PostModel[]

export interface CreatePostRequestDTO {
    token: string,
    content: string
}


export interface EditPostRequestDTO {
    id:string,
    content:string,
    token:string
}

export interface DeletePostRequestDTO {
    token: string,
    id: string
}


