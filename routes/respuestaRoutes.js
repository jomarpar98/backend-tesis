import express from "express";
import { getAllRespuestas, createAllRespuestas} from "../controllers/RespuestaController.js";
const respuestaRouter = express.Router()

respuestaRouter.get('/:idPregunta/:idParticipante',getAllRespuestas)
respuestaRouter.post('/:idParticipante',createAllRespuestas)

export default respuestaRouter