import express from "express";
import { createPreguntas,getExcelRespuestas,getAllPreguntas,getAllPreguntasRespuestas,getEntrevista,createEntrevista} from "../controllers/PreguntaController.js";
const preguntaRouter = express.Router()

preguntaRouter.post('/:id', createPreguntas)
preguntaRouter.get('/:id',getAllPreguntas)
preguntaRouter.get('/respuestas/:id',getAllPreguntasRespuestas)
preguntaRouter.get('/entrevista/:id',getEntrevista)
preguntaRouter.post('/entrevista/:id',createEntrevista)
preguntaRouter.get('/excel/:id', getExcelRespuestas)

export default preguntaRouter