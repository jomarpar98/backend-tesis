import CuestionarioModel from "../models/CuestionarioModel.js"
import PerfilParticipanteModel from "../models/PerfilParticipanteModel.js"
import { Sequelize } from "sequelize";
import PreguntaModel from "../models/PreguntaModel.js";
import AlternativaModel from "../models/AlternativaModel.js";
import RespuestaModel from "../models/RespuestaModel.js";
import xl from "excel4node";
import path from "path";

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

export const getAllPreguntasRespuestas = async (req,res) => {
    try {
        const preguntasOpciones = await PreguntaModel.findAll({
            where:{
                idCuestionario:req.params.id,
                idTipoPregunta:{[Sequelize.Op.not]:0}
            },
            include:{
                model: AlternativaModel,
                as: 'alternativas',
                attributes:{
                    include:[[Sequelize.fn("COUNT",Sequelize.col("Respuesta.idRespuesta")),"respuestas"]]
                },
                group: ['idAlternativa'],
                separate:true,
                include:{
                    model:RespuestaModel,
                    attributes:[],
                }
            },
        })
        const preguntasAbiertas = await PreguntaModel.findAll({
            where:{
                idCuestionario:req.params.id,
                idTipoPregunta: 0
            },
            include:{
                model: RespuestaModel,
            },
        })
        const preguntas = preguntasOpciones.concat(preguntasAbiertas)
        preguntas.sort((a,b)=>a.idPregunta-b.idPregunta)
        res.json(preguntas)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getExcelRespuestas = async (req,res) => {
    try {
        const preguntasOpciones = await PreguntaModel.findAll({
            where:{
                idCuestionario:req.params.id,
                idTipoPregunta:{[Sequelize.Op.not]:0}
            },
            include:{
                model: AlternativaModel,
                as: 'alternativas',
                attributes:{
                    include:[[Sequelize.fn("COUNT",Sequelize.col("Respuesta.idRespuesta")),"respuestas"]]
                },
                group: ['idAlternativa'],
                separate:true,
                include:{
                    model:RespuestaModel,
                    attributes:[],
                }
            },
        })
        const preguntasAbiertas = await PreguntaModel.findAll({
            where:{
                idCuestionario:req.params.id,
                idTipoPregunta: 0
            },
            include:{
                model: RespuestaModel,
            },
        })
        const preguntas = preguntasOpciones.concat(preguntasAbiertas)
        preguntas.sort((a,b)=>a.idPregunta-b.idPregunta)
        var wb = new xl.Workbook();
        var ws = wb.addWorksheet('RespuestasPreguntas');
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
        preguntas.map((p,i)=>{
            ws.cell(1,i+1).string(`Tarea ${i+1}`).style(greenS);
            ws.cell(2,i+1).string(p.enunciado).style(style);
            ws.cell(3,i+1).string(`Respuestas`).style(greenS);
            if(p.idTipoPregunta === 0) {
                p.Respuesta.map((r,j)=>{
                    ws.cell(4+j,i+1).string(r.respuesta).style(style);
                })
            } else {
                p.alternativas.map((a,j)=>{
                    ws.cell(4+j,i+1).string(`#Respuestas: ${a.dataValues.respuestas}, Alternativa: ${a.alternativa}`).style(style);
                })
            }
            ws.column(i+1).setWidth(40)
        })

        const pathExcel = path.join(path.resolve(path.dirname('')), 'excel', 'Respuestas.xlsx')
        
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