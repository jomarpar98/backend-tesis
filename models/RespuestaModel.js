import db from "../database/db.js";

import { DataTypes } from "sequelize";

const RespuestaModel = db.define('Respuesta',{
    idRespuesta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    idParticipante: {type: DataTypes.INTEGER},
    respuesta: {type: DataTypes.STRING},
    idPregunta: {type: DataTypes.INTEGER},
    idAlternativa: {type: DataTypes.INTEGER},
},{
    freezeTableName: true,
    timestamps: false,
})

export default RespuestaModel