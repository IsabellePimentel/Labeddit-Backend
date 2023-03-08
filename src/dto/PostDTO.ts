import { PostModel } from "../types"

export interface GetPostRequestDTO {
    token: string
}

export type GetPostResponseDTO = PostModel[]
