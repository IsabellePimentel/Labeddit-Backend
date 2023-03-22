import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import { userRouter } from './router/userRouter'
import { postRouter } from './router/postRouter';

dotenv.config()

const app = express();

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send(console.log(process.env.DB_FILE_PATH));
});

app.listen(Number(process.env.PORT), () => {
  console.log(`Servidor rodando na porta ${Number(process.env.PORT)}`)
})

app.use("/users", userRouter)
app.use("/posts", postRouter)