import express from "express";
import { getAllTareas,createTareas,getExcelTareasObservaciones,getTareasObservaciones} from "../controllers/TareaController.js";
const tareaRouter = express.Router()

tareaRouter.get('/:id', getAllTareas)
tareaRouter.get('/:idPerfil/:idParticipante', getTareasObservaciones)
tareaRouter.get('/excel/:idPerfil/:idParticipante', getExcelTareasObservaciones)
tareaRouter.post('/:id', createTareas)


export default tareaRouter