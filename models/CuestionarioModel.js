import db from "../database/db.js";

import { DataTypes } from "sequelize";

const CuestionarioModel = db.define('Cuestionario',{
    idCuestionario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    nombre: {type: DataTypes.STRING},
    esEntrevista: {type: DataTypes.TINYINT},
    idPerfil: {type: DataTypes.INTEGER},
    esTareas: {type: DataTypes.TINYINT},
},{
    freezeTableName: true,
    timestamps: false,
})

export default CuestionarioModel