import ObservacionModel from "../models/ObservacionModel.js"
import ParticipanteModel from "../models/ParticipanteModel.js"
import PerfilParticipanteModel from "../models/PerfilParticipanteModel.js"
import TareaModel from "../models/TareaModel.js"
import { Op } from "sequelize";
import UsuarioModel from "../models/UsuarioModel.js"

export const getAllObservaciones = async (req,res) => {
    try {
        const observaciones = await ObservacionModel.findAll({
            where:{
                idParticipante:req.params.idParticipante,
                idObservador:req.params.idObservador,
                '$Tarea.PerfilParticipante.idPruebaUsabilidad$' : req.params.idPruebaUsabilidad,
            },
            include:[{
                model: TareaModel,
                attributes: [],
                include:{
                    model: PerfilParticipanteModel,
                    attributes:[],
                }
            }]
        })
        res.json(observaciones)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createObservaciones = async (req,res) => {
    try {
        await ObservacionModel.destroy({
            where:{
                idParticipante:req.params.idParticipante,
                idObservador:req.params.idObservador,
                idTarea : {[Op.in]:req.body.idTareas},
            }
        })
        await ObservacionModel.bulkCreate(req.body.observaciones)
        res.json({
            "message" : "Registro actualizado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}