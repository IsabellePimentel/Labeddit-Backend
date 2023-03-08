import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import { userRouter } from './router/userRouter'
import { postRouter } from './router/postRouter';

dotenv.config()

const app = express();
const port = 3000;

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send(console.log(process.env.DB_FILE_PATH));
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

app.use("/users", userRouter)
app.use("/posts", postRouter)
