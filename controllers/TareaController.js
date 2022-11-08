import ObservacionModel from "../models/ObservacionModel.js";
import TareaModel from "../models/TareaModel.js";
import xl from "excel4node";
import path from "path";

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

export const getTareasObservaciones = async (req,res) =>{
    try {
        const tareas = await TareaModel.findAll({
            where: {idPerfil: req.params.idPerfil                            
            },
            include: [{
                model: ObservacionModel,
                as: "observaciones",
                where: {
                    idParticipante: req.params.idParticipante
                }
            }]
        })
        res.json(tareas)        
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getExcelTareasObservaciones = async (req,res) =>{
    try {
        const tareas = await TareaModel.findAll({
            where: {idPerfil: req.params.idPerfil                            
            },
            include: [{
                model: ObservacionModel,
                as: "observaciones",
                where: {
                    idParticipante: req.params.idParticipante
                }
            }]
        })
        var wb = new xl.Workbook();
        var ws = wb.addWorksheet('Observaciones');
        var style = wb.createStyle({
            alignment:{
                vertical: 'center',
                wrapText: true,
            },
            font: {
                color: '#040404',
                size:12,  
            },
            border:{
                left:{
                    style: 'medium',
                    color: '#000000'
                },
                right:{
                    style: 'medium',
                    color: '#000000'
                },
                top:{
                    style: 'medium',
                    color: '#000000'
                },
                bottom:{
                    style: 'medium',
                    color: '#000000'
                },                
            }
        })
        var greenS = wb.createStyle({
            font: {
                color: '#040404',
                size: 12,
            },
            fill:{
                type: 'pattern',
                patternType: 'solid',
                fgColor: '#00B050',
            },
            border:{
                left:{
                    style: 'medium',
                    color: '#000000'
                },
                right:{
                    style: 'medium',
                    color: '#000000'
                },
                top:{
                    style: 'medium',
                    color: '#000000'
                },
                bottom:{
                    style: 'medium',
                    color: '#000000'
                },                
            }
        })
        tareas.map((t,i)=>{
            ws.cell(1,i+1).string(`Tarea ${i+1}`).style(greenS);
            ws.cell(2,i+1).string(t.tarea).style(style);
            ws.cell(3,i+1).string(`Observaciones`).style(greenS);
            t.observaciones.map((o,j)=>{
                ws.cell(4+j,i+1).string(o.observacion).style(style);
            })
            ws.column(i+1).setWidth(40)
        })
        
        const pathExcel = path.join(path.resolve(path.dirname('')), 'excel', 'Observaciones.xlsx')
        
        wb.write(pathExcel, (error)=>{
            if (error) {
                console.log(error)
            } else {
                res.download(pathExcel);
                return false;
            }
        })
        

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