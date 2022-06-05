import db from "../database/db.js";

import { DataTypes } from "sequelize";

const ObservacionModel = db.define('Observacion',{
    idObservacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    idParticipante: {type: DataTypes.INTEGER},
    observacion: {type: DataTypes.STRING},
    idObservador: {type: DataTypes.INTEGER},
    idTarea: {type: DataTypes.INTEGER},
},{
    freezeTableName: true,
    timestamps: false,
})

export default ObservacionModel