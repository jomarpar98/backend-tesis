import db from "../database/db.js";

import { DataTypes } from "sequelize";

const ParticipanteModel = db.define('Participante',{
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    idPruebaUsabilidad: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    consentimiento: {type: DataTypes.TINYINT},
    idPerfil: {type: DataTypes.INTEGER},
    idObservador: {type: DataTypes.INTEGER},
    gravacionEntrevista: {type: DataTypes.STRING},
    gravacionPrueba: {type: DataTypes.STRING}
},{
    freezeTableName: true,
    timestamps: false,
})

export default ParticipanteModel