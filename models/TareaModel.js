import db from "../database/db.js";

import { DataTypes } from "sequelize";

const TareaModel = db.define('Tarea',{
    idTarea: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    tarea: {type: DataTypes.STRING},
    idPerfil: {type: DataTypes.INTEGER},
},{
    freezeTableName: true,
    timestamps: false,
})

export default TareaModel