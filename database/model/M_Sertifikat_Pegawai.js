const { DataTypes } = require("sequelize");
const { sequelize } = require("../database_config");

const M_Sertifikat_Pegawai = sequelize.define('data_sertifikat_pegawai', {
    no: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fk_sertifikat_id_pegawai: {
        type: DataTypes.INTEGER(4),
        allowNull: false,
        references: {
            model: 'data_pegawai',
            key: 'id_pegawai'
        }
    },
    nama_sertifikat: {
        type: DataTypes.STRING,
        allowNull: true
    },
    jenis_sertifikat: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fileUrl: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true,
    tableName: 'data_sertifikat_pegawai'
})

module.exports = {M_Sertifikat_Pegawai}