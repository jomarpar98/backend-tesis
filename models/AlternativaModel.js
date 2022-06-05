import db from "../database/db.js";

import { DataTypes } from "sequelize";

const AlternativaModel = db.define('Alternativa',{
    idAlternativa: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    alternativa: {type: DataTypes.STRING},
    idPregunta: {type: DataTypes.INTEGER},
},{
    freezeTableName: true,
    timestamps: false,
})

export default AlternativaModel