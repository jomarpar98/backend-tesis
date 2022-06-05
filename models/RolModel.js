import db from "../database/db.js";

import { DataTypes } from "sequelize";

const RolModel = db.define('Rol',{
    idRol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    nombre: {type: DataTypes.STRING}
},{
    freezeTableName: true,
    timestamps: false,
    classMethods: {
        associate: function(models) {
            this.hasMany(models.Usuario,{foreignKey:'idRol'})
        }
    }
})

export default RolModel