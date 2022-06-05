import MiembroModel from "../models/MiembroModel.js";
import UsuarioModel from "../models/UsuarioModel.js";
import { Op } from "sequelize";

export const getAllMiembros = async (req,res) => {
    try {
        const miembros = await MiembroModel.findAll()
        res.json(miembros)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getMiembro = async (req,res) => {
    try {
        const miembro = await MiembroModel.findOne({
            where:{
                idPruebaUsabilidad:req.params.idPruebaUsabilidad,
                idUsuario: req.params.idUsuario
            }
        })   
        res.json(miembro)     
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getMiembros = async (req,res) => {
    try {
        const miembros = await MiembroModel.findAll({
            where:{
                idPruebaUsabilidad:req.params.id
            },
            include:{
                model: UsuarioModel
            }
        })
        res.json(miembros)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getPruebas = async (req,res) => {
    try {
        const miembro = await MiembroModel.findAll({
            where:{
                idUsuario:req.params.idUsuario
            }
        })
        res.json(miembro)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createMiembro = async (req,res) => {
    try {
        await MiembroModel.create(req.body)
        res.json({
            "message" : "Registro creado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createMiembrosBulk = async (req,res) => {
    try {
        await MiembroModel.bulkCreate(req.body)
        res.json({
            "message" : "Registros creado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateMiembro = async (req,res) => {
    try {
        await MiembroModel.update(req.body,{
            where: {idPruebaUsabilidad: req.params.idPruebaUsabilidad, idUsuario: req.params.idUsuario}
        })
        res.json({
            "message" : "Registro actualizado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteMiembro = async (req,res) => {
    try {
        await MiembroModel.destroy({
            where: {
                idPruebaUsabilidad: req.params.idPruebaUsabilidad,
                idUsuario: req.params.idUsuario            
            }
        })
        res.json({
            "message" : "Registro actualizado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getObservadores = async (req,res) => {
    try {
        const observadores = await MiembroModel.findAll({
            where: {
                idPruebaUsabilidad: req.params.id,
                esObservador: true,
            },
            include:{
                model: UsuarioModel
            }
        })       
        res.json(observadores) 
    } catch (error) {
        res.json({message: error.message})
    }
}