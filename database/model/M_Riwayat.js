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
    fk_riwayat_id_akun: {
        type: DataTypes.INTEGER(4),
        allowNull: true,
        references: {
            model: "data_akuns",
            key: 'id_akun'
        }
    },
    keterangan: {
        type: DataTypes.STRING,
        allowNull: true
    },
    records: {
        type: DataTypes.JSON,
        allowNull: true
    },
    tanggal: {
        type: DataTypes.STRING,
        allowNull: true
    },
    waktu: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false
})

module.exports = {M_DataRiwayat}