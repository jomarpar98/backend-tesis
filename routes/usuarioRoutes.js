import express from "express";
import { getAllUsuarios, getUsuario,getUsuariosDisponibles, sigInUsuario, createUsuario, updateUsuario, deleteUsuario} from "../controllers/UsuarioController.js";
const usuarioRouter = express.Router()

usuarioRouter.get('/', getAllUsuarios)
usuarioRouter.get('/:id', getUsuario)
usuarioRouter.get('/disponibles/:id/:idUsuario', getUsuariosDisponibles)
usuarioRouter.post('/', createUsuario)
usuarioRouter.post('/sigIn', sigInUsuario)
usuarioRouter.put('/:id', updateUsuario)
usuarioRouter.delete('/:id', deleteUsuario)

export default usuarioRouter