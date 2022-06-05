import { Sequelize } from "sequelize";

const db = new Sequelize('bd_tesis','admin','pareja.jose',{
    host:'database-tesis2.cnpzlfgx0ryk.us-east-1.rds.amazonaws.com',
    dialect: 'mysql',
    port: '3306',
})

export default db