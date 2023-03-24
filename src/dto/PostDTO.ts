import { PostModel } from "../types"

export interface GetPostRequestDTO {
    token: string
}

export interface GetPostPorIdRequestDTO {
token: string,
id: string
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


export interface LikeRequestDTO {
    id: string,
    token: string,
    like: number
}

export interface LikeDislikePostDB{
    post_id: string,
    user_id: string,
    like: number
}