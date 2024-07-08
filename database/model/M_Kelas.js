const { DataTypes } = require("sequelize");
const { sequelize } = require("../database_config");

const M_DataKelas = sequelize.define('data_kelas', {
    id_kelas: {
      type: DataTypes.INTEGER(3),
      autoIncrement: true,
      primaryKey: true
    },
    kelas: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    jurusan: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    rombel: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    fk_walikelas_id_pegawai: {
      type: DataTypes.INTEGER(3),
      allowNull: true,
      references: {
        model: 'data_pegawai',
        key: 'id_pegawai'
      }
    },
    fk_gurubk_id_pegawai: {
      type: DataTypes.INTEGER(3),
      allowNull: true,
      references: {
        model: 'data_pegawai',
        key: 'id_pegawai'
      }
    }
  }, {
    timestamps: false, // If you don't want timestamps
    tableName: 'data_kelas' // If table name is different from model name
  });

module.exports = {M_DataKelas}