const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
})

sequelize.sync({ alter: true }).then(() => {
    console.log('Database and all table has synced!')
})


module.exports = {sequelize}