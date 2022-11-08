import db from "../database/db.js";

import { DataTypes } from "sequelize";

const PruebaUsabilidadModel = db.define('PruebaUsabilidad',{
    idPruebaUsabilidad: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    nombre: {type: DataTypes.STRING},
    creacion: {type: DataTypes.DATE},
    software: {type: DataTypes.STRING},
    eSistema: {type: DataTypes.STRING},
    eVideoconfe: {type: DataTypes.STRING},
    idCreador: {type: DataTypes.INTEGER},
    estado: {type: DataTypes.INTEGER},
    reporte: {type: DataTypes.STRING}
},{
    freezeTableName: true,
    timestamps: false,
})

export default PruebaUsabilidadModel