import MiembroModel from "../models/MiembroModel.js";
import PruebaUsabilidadModel from "../models/PruebaUsabilidadModel.js";
import UsuarioModel from "../models/UsuarioModel.js";
import { Sequelize, where } from "sequelize";
import PerfilParticipanteModel from "../models/PerfilParticipanteModel.js";
import CuestionarioModel from "../models/CuestionarioModel.js";
import sendEmail from "../sendEmail.js";

const {or, and, gt, lt, in: opIn} = Sequelize.Op;


export const getAllPruebasUsabilidad = async (req,res) => {
    try {
        const pruebasUsabilidad = await PruebaUsabilidadModel.findAll()
        res.json(pruebasUsabilidad)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getPruebaUsabilidad = async (req,res) => {
    try {
        const pruebaUsabilidad = await PruebaUsabilidadModel.findAll({
            where:{
                idPruebaUsabilidad:req.params.id
            }
        })
        res.json(pruebaUsabilidad)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getReporte = async (req,res) => {
    try {
        const pruebaUsabilidad = await PruebaUsabilidadModel.findOne({
            attributes: ["reporte"],
            where:{
                idPruebaUsabilidad:req.params.id
            }
        })
        res.json(pruebaUsabilidad)        
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getPruebaUsabilidadUsuario = async (req,res) =>{
    try {
        const pruebasUsabilidad = await PruebaUsabilidadModel.findAll({
            order:[
                ["creacion","DESC"]
            ],
            include:[{
                model: UsuarioModel,
                as:'miembros'
            },{
                model: UsuarioModel,
                as:'participantes'
            }
        ]
        })
        const pruebasUsuario = pruebasUsabilidad.filter((p)=>{
            let pasa = false
            p.miembros.map((m)=>{
                if(m.idUsuario == req.params.id) pasa = true
            })
            p.participantes.map((p)=>{
                if(p.idUsuario == req.params.id) pasa = true
            })
            return pasa
        })
        res.json(pruebasUsuario)    
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createPruebaUsabilidad = async (req,res) => {
    try {
        const prueba = await PruebaUsabilidadModel.create(req.body)
        let miembro = {
            idPruebaUsabilidad: prueba.null,
            idUsuario: req.body.idCreador,
            esInvestigador: 1,
        }
        try {
            await MiembroModel.create(miembro)
            res.json({
                "message" : "Registro creado correctamente"
            })  
        } catch (error) {
            res.json({message: error.message})
        }
        let perfilEntrevista={
            perfil:'entrevista',
            idPruebaUsabilidad: prueba.null,
        }
        const perfil = await PerfilParticipanteModel.create(perfilEntrevista)
        let cuestionario = {
            idPerfil: perfil.null,
            esEntrevista: 1,
        }
        await CuestionarioModel.create(cuestionario)      
    } catch (error) {
        res.json({message: error.message})
    }
}

export const updatePruebaUsabilidad = async (req,res) => {
    try {
        await PruebaUsabilidadModel.update(req.body,{
            where: { idPruebaUsabilidad: req.params.id}
        })
        res.json({
            "message" : "Registro actualizado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deletePruebaUsabilidad = async (req,res) => {
    try {
        await PruebaUsabilidadModel.destroy({
            where: {idPruebaUsabilidad: req.params.id}
        })
        res.json({
            "message" : "Registro actualizado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}

export const comenzarPrueba = async (req,res) => {
    try {
        const usuario = await UsuarioModel.findOne({
            where:{
                idUsuario: req.params.idUsuario
            }
        })
        const pruebaUsabilidad = await PruebaUsabilidadModel.findOne({
            where:{
                idPruebaUsabilidad:req.params.id
            }
        })
        if(pruebaUsabilidad.estado === 1) {
            pruebaUsabilidad.estado = 2
            await PruebaUsabilidadModel.update(pruebaUsabilidad,{
                where: { idPruebaUsabilidad: req.params.id}
            })
        }
        const mensaje = `Usted a sido habilitado para responder la prueba de usabilidad.\nIngrese a la sala de videoconferencia con el siguiente link: ${pruebaUsabilidad.eVideoconfe}` + 
        `\nEl enlace al sistema a evaluar es: ${pruebaUsabilidad.eSistema} \nEl enlace del sistema de apoyo es: http://bucket-front-usabilidad.s3-website-us-east-1.amazonaws.com/ \nSu contraseña es: ${usuario.contra}`
        sendEmail(req.body.email,"Prueba de usabilidad disponible",mensaje)     
        res.json("Enviado")   
    } catch (error) {
        res.json({message: error.message})
    }
}