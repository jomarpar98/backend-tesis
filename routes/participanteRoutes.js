import express from "express";
import { createParticipante,getParticipantesObservados,getOneParticipante,getAllParticipantes,updateParticipante,deleteParticipante} from "../controllers/ParticipanteController.js";
const participanteRouter = express.Router()

participanteRouter.post('/',createParticipante)
participanteRouter.get('/:id',getAllParticipantes)
participanteRouter.put('/:idPruebaUsabilidad/:idUsuario',updateParticipante)
participanteRouter.get('/one/:idPruebaUsabilidad/:idUsuario',getOneParticipante)
participanteRouter.delete('/:idPruebaUsabilidad/:idUsuario', deleteParticipante)
participanteRouter.get('/:idPruebaUsabilidad/:idObservador',getParticipantesObservados)

export default participanteRouter