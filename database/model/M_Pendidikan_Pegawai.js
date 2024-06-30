const { DataTypes } = require("sequelize");
const { sequelize } = require("../database_config");

const M_Pendidikan_Pegawai = sequelize.define('data_pendidikan_pegawai', {
    no: {
        type: DataTypes.INTEGER(5),
        autoIncrement: true,
        primaryKey: true
    },
    fk_pendidikan_id_pegawai: {
        type: DataTypes.INTEGER(3),
        allowNull: false,
        references: {
            model: 'data_pegawai',
            key: 'id_pegawai'
        }
    },
    tingkat_pendidikan: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    sekolah: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    universitas: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    fakultas: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    program_studi: {
        type: DataTypes.STRING(100),
        allowNull: true
    }
}, {
    timestamps: true,
    tableName: 'data_pendidikan_pegawai'
})

module.exports = {M_Pendidikan_Pegawai}