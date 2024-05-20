const { DataTypes } = require("sequelize");
const { sequelize } = require("../database_config");

const M_DataSertifikat = sequelize.define('data_sertifikat', {
    sertifikat_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    sertifikat_id_pegawai: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    jenis_sertifikat: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nama_sertifikat: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fileUrl: {
      type: DataTypes.STRING,
      allowNull: true // Adjust allowNull based on your requirement
    },
    keterangan: {
      type: DataTypes.STRING,
      allowNull: true // Adjust allowNull based on your requirement
    }
  }, {
    timestamps: false, // If you don't want timestamps
    tableName: 'data_sertifikat' // If table name is different from model name
  });

  M_DataSertifikat.sync({ alter: true})

module.exports = {M_DataSertifikat}