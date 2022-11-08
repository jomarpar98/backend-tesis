import express from "express";
import { getAllPruebasUsabilidad,getReporte,comenzarPrueba, getPruebaUsabilidad,getPruebaUsabilidadUsuario, createPruebaUsabilidad, updatePruebaUsabilidad, deletePruebaUsabilidad} from "../controllers/PruebaUsabilidadController.js";
const pruebaUsabilidadRouter = express.Router()

pruebaUsabilidadRouter.get('/pruebas/:id', getPruebaUsabilidadUsuario)
pruebaUsabilidadRouter.get('/', getAllPruebasUsabilidad)
pruebaUsabilidadRouter.get('/:id', getPruebaUsabilidad)
pruebaUsabilidadRouter.get('/:id/reporte', getReporte)
pruebaUsabilidadRouter.post('/', createPruebaUsabilidad)
pruebaUsabilidadRouter.put('/:id', updatePruebaUsabilidad)
pruebaUsabilidadRouter.delete('/:id', deletePruebaUsabilidad)
pruebaUsabilidadRouter.post('/:id/:idUsuario',comenzarPrueba)

export default pruebaUsabilidadRouter