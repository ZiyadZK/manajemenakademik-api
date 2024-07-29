const { DataTypes } = require("sequelize");
const { sequelize } = require("../database_config");

const M_DataIjazah = sequelize.define('data_ijazahs', {
    no: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tanggal_diambil: {
      type: DataTypes.STRING,
      allowNull: true
    },
    no_ijazah: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    fk_ijazah_nis: {
      type: DataTypes.STRING(200),
      allowNull: true,
      references: {
        model: 'data_alumni',
        key: 'nis'
      }
    },
    nama_pengambil: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    timestamps: false, // If you don't want timestamps
    tableName: 'data_ijazahs',
    indexes: [
      {
        unique: true,
        fields: ['fk_ijazah_nis']
      }
    ]
  });

module.exports = {M_DataIjazah}