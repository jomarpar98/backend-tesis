import PerfilParticipanteModel from "../models/PerfilParticipanteModel.js";
import { Sequelize } from "sequelize";

export const getAllPerfiles = async (req,res) => {
    try {
        const perfiles = await PerfilParticipanteModel.findAll({
            where: {
                idPruebaUsabilidad: req.params.id,
                perfil: {[Sequelize.Op.not]:'entrevista'}
            }
        })
        res.json(perfiles)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createPerfil = async (req,res) => {
    try {
        await PerfilParticipanteModel.create(req.body)
        res.json({
            "message" : "Registro creado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deletePerfil = async (req,res) => {
    try {
        await PerfilParticipanteModel.destroy({
            where: {idPerfilParticipante: req.params.id}
        })
        res.json({
            "message" : "Registro actualizado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}

export const updatePerfil = async (req,res) => {
    try {
        await PerfilParticipanteModel.update(req.body,{
            where: { idPerfilParticipante: req.params.id}
        })
        res.json({
            "message" : "Registro actualizado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}