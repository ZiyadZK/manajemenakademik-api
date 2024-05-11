const { DataTypes } = require("sequelize");
const { sequelize } = require("../database_config");

exports.M_DataIjazah = sequelize.define('data_ijazahs', {
    no: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tgl_diambil: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nama_lulusan: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    nisn: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    nama_pengambil: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    kelas: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    rombel: {
      type: DataTypes.STRING,
      allowNull: false
    },
    no_rombel: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tahun_lulus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    timestamps: false, // If you don't want timestamps
    tableName: 'data_ijazahs' // If table name is different from model name
  });