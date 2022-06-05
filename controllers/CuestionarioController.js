import CuestionarioModel from "../models/CuestionarioModel.js"
import PerfilParticipanteModel from "../models/PerfilParticipanteModel.js"
import { Sequelize } from "sequelize";
import PreguntaModel from "../models/PreguntaModel.js";

export const getAllCuestionarios = async (req,res) => {
    try {
        const cuestionarios = await CuestionarioModel.findAll({
            attributes:{
                include:[[Sequelize.fn("COUNT",Sequelize.col("Pregunta.idPregunta")),"preguntas"]]
            },
            group: ['idCuestionario'],
            where:{
                '$PerfilParticipante.idPruebaUsabilidad$':req.params.id,
                esEntrevista: 0,
                esTareas: 0,
            },
            include:[{
                model: PerfilParticipanteModel,
            },{
                model: PreguntaModel,
                attributes: []
            }]
        })
        res.json(cuestionarios)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createCuestionario = async (req,res) => {
    try {
        await CuestionarioModel.create(req.body)        
        res.json({
            "message" : "Registro creado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateCuestionario = async (req,res) => {
    try {
        await CuestionarioModel.update(req.body,{
            where: { idCuestionario: req.params.id}
        })
        res.json({
            "message" : "Registro actualizado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteCuestionario = async (req,res) => {
    try {
        await CuestionarioModel.destroy({
            where: {idCuestionario: req.params.id}
        })
        res.json({
            "message" : "Registro actualizado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getCuestionariosPerfil = async (req,res) => {
    try {
        const cuestionarios = await CuestionarioModel.findAll({
            attributes:{
                include:[[Sequelize.fn("COUNT",Sequelize.col("Pregunta.idPregunta")),"preguntas"]]
            },
            group: ['idCuestionario'],
            where:{
                idPerfil:req.params.id,
                esEntrevista: 0,
                esTareas: 0,
            },
            include:[{
                model: PerfilParticipanteModel,
            },{
                model: PreguntaModel,
                attributes: []
            }]
        })
        res.json(cuestionarios)
    } catch (error) {
        res.json({message: error.message})
    }
}