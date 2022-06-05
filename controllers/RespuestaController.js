import { Sequelize } from "sequelize";
import PreguntaModel from "../models/PreguntaModel.js";
import AlternativaModel from "../models/AlternativaModel.js";
import RespuestaModel from "../models/RespuestaModel.js";

export const getAllRespuestas = async (req,res) => {
    try {
        const respuestas = await RespuestaModel.findAll({
            where:{
                idPregunta:req.params.idPregunta,
                idParticipante:req.params.idParticipante,
            },
        })
        res.json(respuestas)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createAllRespuestas = async (req,res) => {
    try {
        await Promise.all (req.body.preguntas.map(async(p)=>{
            await RespuestaModel.destroy({
                where:{
                    idPregunta:p.idPregunta,
                    idParticipante:req.params.idParticipante,
                }
            })
        }))
        await RespuestaModel.bulkCreate(req.body.respuestas)
        res.json({
            "message" : "Registro actualizado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}

