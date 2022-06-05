import express from "express";
import { getAllTareas,createTareas} from "../controllers/TareaController.js";
const tareaRouter = express.Router()

tareaRouter.get('/:id', getAllTareas)
tareaRouter.post('/:id', createTareas)

export default tareaRouter