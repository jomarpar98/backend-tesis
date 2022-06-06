import UsuarioModel from "../models/UsuarioModel.js";
import MiembroModel from "../models/MiembroModel.js";
import RolModel from "../models/RolModel.js";
import {OAuth2Client} from 'google-auth-library';
import { Op } from "sequelize";
import sendEmail from "../sendEmail.js";

export const getAllUsuarios = async (req,res) => {
    try {
        const usuarios = await UsuarioModel.findAll()
        res.json(usuarios)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getUsuario = async (req,res) => {
    try {
        const usuario = await UsuarioModel.findAll({
            where:{
                idUsuario:req.params.id
            },
            include: [{
                model: RolModel,
                as: 'Rol'
            }]
        })
        res.json(usuario)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const sigInUsuario = async (req,res) => {
    const client = new OAuth2Client(req.body.clientID);
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: req.body.token,
            audience: req.body.clientID,
        });
        const payload = await ticket.getPayload();
        //console.log(payload)
        return payload
    }
    const respuesta = await verify().catch(console.error)
    if (respuesta?.email === req.body.email) {
        const usuarioUpdate = {
            nombre: respuesta.given_name,
            apPaterno: respuesta.family_name.split(" ")[0],
            apMaterno: respuesta.family_name.split(" ")[1]
        }
        try {
            await UsuarioModel.update(usuarioUpdate,{
                where: { email: respuesta.email}
            })
        } catch (error) {
            res.json({message: error.message})
        }
        try {
            const usuario = await UsuarioModel.findOne({
                where:{
                    email: respuesta.email
                }
            })
            if (usuario !== null) {
                console.log(usuario);
                usuario.imageUrl = respuesta.picture
                res.json(usuario)
            }
            else {
                res.json("USUARIO_NO_EXISTE")
            }
            
        } catch (error) {
            res.json({message: error.message})
        }
    } else {
        res.json("El correo enviado no coincide con el token id")
    }
}

export const sigInProvicional = async (req,res) =>{
    try {
        const usuario = await UsuarioModel.findOne({
            where:{
                email : req.body.email,
                contra : req.body.contra
            }
        })
        if (usuario !== null) {
            usuario.imageUrl = ""
            res.json(usuario)
        }
        else {
            res.json("USUARIO_NO_EXISTE")
        }
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createUsuario = async (req,res) => {
    try {
        let contra = Math.random().toString(16).slice(2, 8)
        req.body.contra = contra
        await UsuarioModel.create(req.body)
        sendEmail(req.body.email,"Nuevo usuario creado",`Usted a sido registrado con exito en el sistema.\nEl enlace del sistema es: http://bucket-front-usabilidad.s3-website-us-east-1.amazonaws.com/ \nSu contraseña es: ${contra}`)
        res.json({
            "message" : "Registro creado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateUsuario = async (req,res) => {
    try {
        await UsuarioModel.update(req.body,{
            where: { idUsuario: req.params.id}
        })
        res.json({
            "message" : "Registro actualizado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteUsuario = async (req,res) => {
    try {
        await UsuarioModel.destroy({
            where: {idUsuario: req.params.id}
        })
        res.json({
            "message" : "Registro actualizado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getUsuariosDisponibles = async (req,res) => {
    try {
        const miembros = await MiembroModel.findAll({
            where:{
                idPruebaUsabilidad:req.params.id
            }
        })
        let idMiembros = []
        await miembros.map((miembro)=>{
            if(miembro.idUsuario !== req.params.idUsuario){
                idMiembros.push(miembro.idUsuario)
            }
        })
        try {
            const usuarios = await UsuarioModel.findAll({
                where:{
                    idUsuario: {[Op.notIn]:idMiembros},
                    idRol: 1
                }
            })
            res.json(usuarios)            
        } catch (error) {
            res.json({message: error.message})
        }
    } catch (error) {
        res.json({message: error.message})
    }
}