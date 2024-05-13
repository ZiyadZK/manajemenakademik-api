const { DataTypes } = require("sequelize");
const { sequelize } = require("../database_config");

const M_DataPegawai = sequelize.define('data_pegawai', {
    id_pegawai: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama_pegawai: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    jabatan: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status_kepegawaian: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    nik: {
      type: DataTypes.STRING(16),
      allowNull: true,
      unique: true
    },
    nip: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    nuptk: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tmpt_lahir: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tgl_lahir: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tmt: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pendidikan_terakhir: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sekolah_pendidikan: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sarjana_universitas: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sarjana_fakultas: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sarjana_prodi: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    magister_universitas: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    magister_fakultas: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    magister_prodi: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    keterangan: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pensiun: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    timestamps: false, // If you don't want timestamps
    tableName: 'data_pegawai' // If table name is different from model name
  });

M_DataPegawai.sync()

module.exports = {M_DataPegawai}