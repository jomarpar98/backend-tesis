import CuestionarioModel from "../models/CuestionarioModel.js"
import PerfilParticipanteModel from "../models/PerfilParticipanteModel.js"
import { Sequelize } from "sequelize";
import PreguntaModel from "../models/PreguntaModel.js";
import AlternativaModel from "../models/AlternativaModel.js";
import RespuestaModel from "../models/RespuestaModel.js";

export const getAllPreguntas = async (req,res) => {
    try {
        const preguntas = await PreguntaModel.findAll({
            where:{
                idCuestionario:req.params.id,
            },
            include:{
                model: AlternativaModel,
                as: 'alternativas'
            },
        })
        res.json(preguntas)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createPreguntas = async (req,res) => {
    try {
        let preguntas = req.body
        await PreguntaModel.destroy({
            where:{
                idCuestionario: req.params.id
            }
        })
        await Promise.all (preguntas.map(async (pregunta)=>{
            const nuevaPreg = await PreguntaModel.create(pregunta)
            if(pregunta.alternativas){
                await Promise.all(pregunta.alternativas.map(async (alternativa)=>{
                    alternativa.idPregunta = nuevaPreg.null
                    await AlternativaModel.create(alternativa)
                }))
            }
        }))
        res.json({
            "message" : "Registro actualizado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getEntrevista = async(req,res) => {
    try {
        const preguntas = await PreguntaModel.findAll({
            where:{
                '$Cuestionario.esEntrevista$':1,
                '$Cuestionario.PerfilParticipante.idPruebaUsabilidad$': req.params.id
            },
            include:[{
                model: CuestionarioModel,
                attributes: [],
                include:[{
                    model: PerfilParticipanteModel,
                }],
            }]
        })
        res.json(preguntas)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createEntrevista = async(req,res)=>{
    try {
        const entrevista = await CuestionarioModel.findOne({
            where:{
                esEntrevista: 1,
                '$PerfilParticipante.idPruebaUsabilidad$':req.params.id
            },
            include:[{
                model: PerfilParticipanteModel,
                attributes: [],
            }]
        })
        const preguntas = req.body.map((pregunta)=>{
            pregunta.idCuestionario = entrevista.idCuestionario
            return pregunta
        })
        await PreguntaModel.destroy({
            where:{
                idCuestionario : entrevista.idCuestionario
            }
        })
        await PreguntaModel.bulkCreate(preguntas) 
        res.json({
            "message" : "Registro actualizado correctamente"
        })       
    } catch (error) {
        res.json({message: error.message})
    }
}