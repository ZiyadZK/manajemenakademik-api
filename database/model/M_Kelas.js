const { DataTypes } = require("sequelize");
const { sequelize } = require("../database_config");

exports.M_DataKelas = sequelize.define('data_kelas', {
    id_kelas: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    kelas: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_walikelas: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nama_walikelas: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nik_walikelas: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_guru_bk: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nama_guru_bk: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nik_guru_bk: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    timestamps: false, // If you don't want timestamps
    tableName: 'data_kelas' // If table name is different from model name
  });