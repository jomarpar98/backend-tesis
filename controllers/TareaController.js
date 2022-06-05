import TareaModel from "../models/TareaModel.js";

export const getAllTareas = async (req,res) => {
    try {
        const tareas = await TareaModel.findAll({
            where: {idPerfil: req.params.id}
        })
        res.json(tareas)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createTareas = async (req,res) => {
    try {
        await TareaModel.destroy({
            where: {idPerfil: req.params.id}
        })
        await TareaModel.bulkCreate(req.body)
        res.json({
            "message" : "Registro actualizado correctamente"
        })          
    } catch (error) {
        res.json({message: error.message})
    }
}