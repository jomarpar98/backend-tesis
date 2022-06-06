import express from "express";
import cors from "cors";
import db from "./database/db.js";

import usuarioRouter from './routes/usuarioRoutes.js'
import pruebaUsabilidadRouter from './routes/pruebaUsabilidadRoutes.js'
import perfilParticipanteRouter from "./routes/perfilParticipanteRoutes.js";
import tareaRouter from "./routes/tareaRoutes.js";
import miembroRouter from "./routes/miembroRoutes.js";
import Assosiations from "./models/Assosiations.js";
import participanteRouter from "./routes/participanteRoutes.js";
import cuestionarioRouter from "./routes/cuestionarioRoutes.js";
import preguntaRouter from "./routes/preguntaRoutes.js";
import observacionRouter from "./routes/observacionRoutes.js";
import respuestaRouter from "./routes/respuestaRoutes.js";

const app = express()

app.use(cors())
app.use(express.json())
app.use('/usuario',usuarioRouter)
app.use('/pruebaUsabilidad',pruebaUsabilidadRouter)
app.use('/perfilParticipante',perfilParticipanteRouter)
app.use('/tarea',tareaRouter)
app.use('/miembro',miembroRouter)
app.use('/participante',participanteRouter)
app.use('/cuestionario',cuestionarioRouter)
app.use('/pregunta',preguntaRouter)
app.use('/observacion',observacionRouter)
app.use('/respuesta',respuestaRouter)

try {
    await db.authenticate()
    Assosiations()
    console.log('Conexion exitosa')
} catch (error) {
    console.log(`El error es: ${error}`)
}

app.listen(8000, ()=> {
    console.log('Server UP running in port 8000')
})