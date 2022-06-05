import db from "../database/db.js";

import { DataTypes } from "sequelize";

const MiembroModel = db.define('Miembro',{
    idPruebaUsabilidad: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    esInvestigador: {type: DataTypes.TINYINT},
    esObservador: {type: DataTypes.TINYINT},
},{
    freezeTableName: true,
    timestamps: false,
})

export default MiembroModel