import express from "express";
import { getAllPruebasUsabilidad,comenzarPrueba, getPruebaUsabilidad,getPruebaUsabilidadUsuario, createPruebaUsabilidad, updatePruebaUsabilidad, deletePruebaUsabilidad} from "../controllers/PruebaUsabilidadController.js";
const pruebaUsabilidadRouter = express.Router()

pruebaUsabilidadRouter.get('/pruebas/:id', getPruebaUsabilidadUsuario)
pruebaUsabilidadRouter.get('/', getAllPruebasUsabilidad)
pruebaUsabilidadRouter.get('/:id', getPruebaUsabilidad)
pruebaUsabilidadRouter.post('/', createPruebaUsabilidad)
pruebaUsabilidadRouter.put('/:id', updatePruebaUsabilidad)
pruebaUsabilidadRouter.delete('/:id', deletePruebaUsabilidad)
pruebaUsabilidadRouter.post('/:id',comenzarPrueba)

export default pruebaUsabilidadRouter