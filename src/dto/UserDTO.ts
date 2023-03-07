import { UserModel } from "../types"


export type GetUsersDTO = UserModel[]

export interface SignupRequestDTO {
    name: string,
    email: string,
    password: string
}

export interface SignupResponseDTO {
    token: string
}