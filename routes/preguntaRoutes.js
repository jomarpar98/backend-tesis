import express from "express";
import { createPreguntas,getAllPreguntas,getEntrevista,createEntrevista} from "../controllers/PreguntaController.js";
const preguntaRouter = express.Router()

preguntaRouter.post('/:id', createPreguntas)
preguntaRouter.get('/:id',getAllPreguntas)
preguntaRouter.get('/entrevista/:id',getEntrevista)
preguntaRouter.post('/entrevista/:id',createEntrevista)

export default preguntaRouter