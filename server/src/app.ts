import 'dotenv/config';
import express from 'express'
import { router } from './routes';
import { ErrorProcessing } from './repositories/implementations/ErrorRepository';
import cookieParser from "cookie-parser";

const app = express()

app.use(express.json())

app.use(cookieParser());

app.use(router) // arquivo com as rotas

app.use(ErrorProcessing) // middleware de erro

export { app };
