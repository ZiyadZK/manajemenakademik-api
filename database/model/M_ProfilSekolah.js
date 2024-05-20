const { DataTypes } = require("sequelize");
const { sequelize } = require("../database_config");

const M_DataProfilSekolah = sequelize.define('data_profil_sekolah', {
    npsn: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bentuk_pendidikan: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status_kepemilikan: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sk_pendirian_sekolah: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tanggal_sk_pendirian: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sk_izin_operasional: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tanggal_sk_izin_operasional: {
      type: DataTypes.STRING,
      allowNull: true
    },
    operator: {
      type: DataTypes.STRING,
      allowNull: true
    },
    akreditasi: {
      type: DataTypes.STRING,
      allowNull: true
    },
    kurikulum: {
      type: DataTypes.STRING,
      allowNull: true
    },
    waktu: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    timestamps: false, // If you don't want timestamps
    tableName: 'data_profil_sekolah' // If table name is different from model name
  });

  M_DataProfilSekolah.sync({ alter: true})

module.exports = {M_DataProfilSekolah}