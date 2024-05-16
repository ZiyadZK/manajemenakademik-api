const { DataTypes } = require("sequelize");
const { sequelize } = require("../database_config");

const M_DataRiwayat = sequelize.define('data_riwayat', {
    id_riwayat: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    aksi: {
        type: DataTypes.STRING,
        allowNull: true
    },
    kategori: {
        type: DataTypes.STRING,
        allowNull: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: true
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    records: {
        type: DataTypes.JSON,
        allowNull: true
    }
})

M_DataRiwayat.sync({alter: true})

module.exports = {M_DataRiwayat}