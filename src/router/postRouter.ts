import express from "express"
import { PostBusiness } from "../business/PostBusiness"
import { PostController } from "../controller/PostController"
import { PostDatabase } from "../database/PostDataBase"
import { TokenManager } from "../service/TokenManager"

export const postRouter = express.Router()


const postController = new PostController(
    new PostBusiness(
        new TokenManager(),
        new PostDatabase(),
    )
)


postRouter.get("/", postController.getPosts)
