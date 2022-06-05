import express from "express";
import { getMiembros, createMiembro, getMiembro, createMiembrosBulk,updateMiembro,deleteMiembro, getObservadores} from "../controllers/MiembroController.js";
const miembroRouter = express.Router()

miembroRouter.get('/:id/', getMiembros)
miembroRouter.get('/observadores/:id/', getObservadores)
miembroRouter.get('/:idPruebaUsabilidad/:idUsuario',getMiembro)
miembroRouter.post('/', createMiembro)
miembroRouter.post('/bulk/', createMiembrosBulk)
miembroRouter.put('/:idPruebaUsabilidad/:idUsuario', updateMiembro)
miembroRouter.delete('/:idPruebaUsabilidad/:idUsuario', deleteMiembro)

export default miembroRouter