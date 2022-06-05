import db from "../database/db.js";

import { DataTypes } from "sequelize";

const PreguntaModel = db.define('Pregunta',{
    idPregunta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    enunciado: {type: DataTypes.STRING},
    idCuestionario: {type: DataTypes.INTEGER},
    idTipoPregunta: {type: DataTypes.INTEGER},
},{
    freezeTableName: true,
    timestamps: false,
})

export default PreguntaModel