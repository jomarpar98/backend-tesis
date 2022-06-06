import db from "../database/db.js";

import { DataTypes } from "sequelize";

const UsuarioModel = db.define('Usuario',{
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {type: DataTypes.STRING},
    nombre: {type: DataTypes.STRING},
    apPaterno: {type: DataTypes.STRING},
    apMaterno: {type: DataTypes.STRING},
    idRol: {type: DataTypes.INTEGER},
    contra: {type: DataTypes.STRING},
},{
    freezeTableName: true,
    timestamps: false,
    classMethods: {
        associate: function(models) {
            this.belongsTo(models.Rol)
        }
    }
})

export default UsuarioModel