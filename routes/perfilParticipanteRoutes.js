import express from "express";
import { getAllPerfiles,createPerfil,deletePerfil,updatePerfil} from "../controllers/PerfilParticipanteController.js";
const perfilParticipanteRouter = express.Router()

perfilParticipanteRouter.get('/:id', getAllPerfiles)
perfilParticipanteRouter.post('/', createPerfil)
perfilParticipanteRouter.delete('/:id', deletePerfil)
perfilParticipanteRouter.put('/:id', updatePerfil)

export default perfilParticipanteRouter