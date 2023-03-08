import express from 'express'
import { UserController } from '../controller/UserController'
import { UserBusiness } from '../business/UserBusiness'
import { UserDatabase } from '../database/UserDataBase'
import { IdGenerator } from '../service/IdGenerator'
import { TokenManager } from '../service/TokenManager'

export const userRouter = express.Router()

const userController = new UserController(
    new UserBusiness(
        new UserDatabase(),
        new IdGenerator(),
        new TokenManager()
    ),
)

userRouter.get("/", userController.obter)
userRouter.post("/signup", userController.signup)
userRouter.post("/login", userController.login)