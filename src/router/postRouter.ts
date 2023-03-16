import express from "express"
import { PostBusiness } from "../business/PostBusiness"
import { PostController } from "../controller/PostController"
import { PostDatabase } from "../database/PostDataBase"
import { IdGenerator } from "../service/IdGenerator"
import { TokenManager } from "../service/TokenManager"

export const postRouter = express.Router()


const postController = new PostController(
    new PostBusiness(
        new TokenManager(),
        new PostDatabase(),
        new IdGenerator()
    )
)


postRouter.get("/", postController.obter)
postRouter.post("/", postController.criar)
postRouter.put("/:id", postController.editar)
postRouter.delete("/:id", postController.deletar)
postRouter.put("/:id/likedislike", postController.likedislike)