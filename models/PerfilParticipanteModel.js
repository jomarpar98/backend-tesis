import db from "../database/db.js";

import { DataTypes } from "sequelize";
import ParticipanteModel from "./ParticipanteModel.js";

const PerfilParticipanteModel = db.define('PerfilParticipante',{
    idPerfilParticipante: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    perfil: {type: DataTypes.STRING},
    idPruebaUsabilidad: {type: DataTypes.INTEGER},
},{
    freezeTableName: true,
    timestamps: false,
})

export default PerfilParticipanteModel