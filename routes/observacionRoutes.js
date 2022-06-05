import express from "express";
import { getAllObservaciones,createObservaciones} from "../controllers/ObservacionController.js";
const observacionRouter = express.Router()

observacionRouter.get('/:idParticipante/:idObservador/:idPruebaUsabilidad', getAllObservaciones)
observacionRouter.post('/:idParticipante/:idObservador', createObservaciones)

export default observacionRouter