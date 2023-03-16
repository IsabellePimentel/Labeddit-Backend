import express from "express"
import { CommentBusiness } from "../business/CommentBusiness"
import { PostBusiness } from "../business/PostBusiness"
import { CommentController } from "../controller/CommentController"
import { PostController } from "../controller/PostController"
import { CommentDatabase } from "../database/CommentDataBase"
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

const commentController = new CommentController(
    new CommentBusiness(
        new TokenManager(),
        new IdGenerator(),
        new CommentDatabase()
    )
)


postRouter.get("/", postController.obter)
postRouter.post("/", postController.criar)
postRouter.put("/:id", postController.editar)
postRouter.delete("/:id", postController.deletar)
postRouter.put("/:id/likedislike", postController.likedislike)
postRouter.get("/:id/comments", commentController.obter)
postRouter.post("/:id/comments", commentController.criar)