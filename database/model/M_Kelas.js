const { DataTypes } = require("sequelize");
const { sequelize } = require("../database_config");

const M_DataKelas = sequelize.define('data_kelas', {
    id_kelas: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    kelas: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rombel: {
      type: DataTypes.STRING,
      allowNull: false
    },
    no_rombel: {
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
    email_walikelas: {
      type: DataTypes.STRING(100),
      allowNull: true
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
    },
    email_guru_bk: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    timestamps: false, // If you don't want timestamps
    tableName: 'data_kelas' // If table name is different from model name
  });

  M_DataKelas.sync({ alter: true})
module.exports = {M_DataKelas}