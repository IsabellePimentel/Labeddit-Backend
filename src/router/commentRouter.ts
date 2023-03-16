import express from "express";
import { CommentBusiness } from "../business/CommentBusiness";
import { CommentController } from "../controller/CommentController";
import { CommentDatabase } from "../database/CommentDataBase";
import { IdGenerator } from "../service/IdGenerator";
import { TokenManager } from "../service/TokenManager";

export const commentRouter = express.Router()

const commentController = new CommentController(
    new CommentBusiness(
        new TokenManager(),
        new IdGenerator(),
        new CommentDatabase()
    )
)

commentRouter.get("/", commentController.obter)