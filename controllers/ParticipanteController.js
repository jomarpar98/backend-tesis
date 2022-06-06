import ParticipanteModel from "../models/ParticipanteModel.js"
import PerfilParticipanteModel from "../models/PerfilParticipanteModel.js"
import UsuarioModel from "../models/UsuarioModel.js"

export const getAllParticipantes = async (req,res) => {
    try {
        const participantes = await ParticipanteModel.findAll({
            where:{
                idPruebaUsabilidad:req.params.id
            },
            include:[{
                model: UsuarioModel,
                as: 'Observador'
            },{
                model: UsuarioModel,
                as: 'Usuario'
            },{
                model: PerfilParticipanteModel
            }]
        })
        res.json(participantes)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getParticipante = async (req,res) => {
    try {
        const participante = await ParticipanteModel.findAll({
            where:{
                idPruebaUsabilidad:req.params.idPruebaUsabilidad,
                idUsuario: req.params.idUsuario
            },
            include: [{
                model: UsuarioModel
            }]
        })
        res.json(participante)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createParticipante = async (req,res) => {
    try {
        const [usuario,creado] = await UsuarioModel.findOrCreate({
            where: {email: req.body.email},
            defaults:{
                email: req.body.email,
                nombre: req.body.nombre,
                apPaterno: req.body.apPaterno,
                apMaterno: req.body.apMaterno,
                contra: Math.random().toString(16).slice(2, 8),
                idRol: 3,
            }
        })
        const participante = {
            idUsuario: usuario.idUsuario,
            idPruebaUsabilidad: req.body.idPruebaUsabilidad,
            consentimiento: req.body.consentimiento,
            idPerfil: req.body.idPerfil,
            idObservador: req.body.idObservador,
        }
        console.log(participante)
        await ParticipanteModel.create(participante)
        res.json({
            "message" : "Registro creado correctamente"
        })
    } catch (error) {
        res.json({message: error})
    }
}

export const updateParticipante  = async (req,res) => {
    try {
        await ParticipanteModel.update(req.body,{
            where:{
                idPruebaUsabilidad:req.params.idPruebaUsabilidad,
                idUsuario: req.params.idUsuario
            },
        })
        await UsuarioModel.update(req.body,{
            where:{
                idUsuario: req.params.idUsuario
            },
        })
        res.json({
            "message" : "Registro actualizado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteParticipante = async (req,res) => {
    try {
        await ParticipanteModel.destroy({
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

export const getParticipantesObservados = async(req,res) => {
    try {
        const participantes = await ParticipanteModel.findAll({
            where:{
                idPruebaUsabilidad:req.params.idPruebaUsabilidad,
                idObservador: req.params.idObservador
            },
            include:[{
                model: UsuarioModel,
                as: 'Usuario'
            },{
                model: PerfilParticipanteModel
            }]
        })
        res.json(participantes)        
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getOneParticipante = async(req,res) => {
    try {
        const participante = await ParticipanteModel.findOne({
            where: {
                idPruebaUsabilidad: req.params.idPruebaUsabilidad,
                idUsuario: req.params.idUsuario            
            },
            include:[{
                model: UsuarioModel,
                as: 'Usuario'
            },{
                model: PerfilParticipanteModel
            }]
        })
        res.json(participante)    
    } catch (error) {
        res.json({message: error.message})
    }
}