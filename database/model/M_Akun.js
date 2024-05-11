const { DataTypes } = require("sequelize");
const { sequelize } = require("../database_config");

exports.M_DataAkun = sequelize.define('data_akuns', {
    id_akun: {
      type: DataTypes.STRING(255),
      primaryKey: true
    },
    email_akun: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true
    },
    password_akun: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    nama_akun: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    role_akun: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    timestamps: false, // If you don't want timestamps
    tableName: 'data_akuns' // If table name is different from model name
  });