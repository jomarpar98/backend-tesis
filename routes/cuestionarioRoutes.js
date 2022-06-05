import express from "express";
import { getAllCuestionarios,getCuestionariosPerfil, updateCuestionario, deleteCuestionario, createCuestionario} from "../controllers/CuestionarioController.js";
const cuestionarioRouter = express.Router()

cuestionarioRouter.get('/:id',getAllCuestionarios)
cuestionarioRouter.get('/perfil/:id',getCuestionariosPerfil)
cuestionarioRouter.put('/:id',updateCuestionario)
cuestionarioRouter.delete('/:id', deleteCuestionario)
cuestionarioRouter.post('/',createCuestionario)


export default cuestionarioRouter