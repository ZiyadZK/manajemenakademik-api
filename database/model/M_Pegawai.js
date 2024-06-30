const { DataTypes } = require("sequelize");
const { sequelize } = require("../database_config");
const { M_Pendidikan_Pegawai } = require("./M_Pendidikan_Pegawai");
const { M_DataAkun } = require("./M_Akun");
const { M_Sertifikat_Pegawai } = require("./M_Sertifikat_Pegawai");
const { M_DataKelas } = require("./M_Kelas");

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
    email_pegawai: {
      type: DataTypes.STRING(100),
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
      unique: 'nik'
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
    tanggal_lahir: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tmt: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    timestamps: false, // If you don't want timestamps
    tableName: 'data_pegawai' // If table name is different from model name
  });

M_DataPegawai.hasMany(M_Pendidikan_Pegawai, { foreignKey: 'fk_pendidikan_id_pegawai', sourceKey: 'id_pegawai', as: 'daftar_pendidikan', onDelete: 'CASCADE'})
M_Pendidikan_Pegawai.belongsTo(M_DataPegawai, { foreignKey: 'fk_pendidikan_id_pegawai', targetKey: 'id_pegawai'})

M_DataPegawai.hasOne(M_DataAkun, { foreignKey: 'fk_akun_id_pegawai', as: 'akun', onDelete: 'CASCADE'})
M_DataAkun.belongsTo(M_DataPegawai, { foreignKey: 'fk_akun_id_pegawai', targetKey: 'id_pegawai'})

M_DataPegawai.hasMany(M_Sertifikat_Pegawai, { foreignKey: 'fk_sertifikat_id_pegawai', sourceKey: 'id_pegawai', as: 'daftar_sertifikat', onDelete: 'CASCADE'})
M_Sertifikat_Pegawai.belongsTo(M_DataPegawai, { foreignKey: 'fk_sertifikat_id_pegawai', targetKey: 'id_pegawai'})

M_DataPegawai.hasMany(M_DataKelas, { foreignKey: 'fk_walikelas_id_pegawai', sourceKey: 'id_pegawai', as: 'wali_kelas', onDelete: 'SET NULL'})
M_DataKelas.belongsTo(M_DataPegawai, { foreignKey: 'fk_walikelas_id_pegawai', targetKey: 'id_pegawai'})

M_DataPegawai.hasMany(M_DataKelas, { foreignKey: 'fk_gurubk_id_pegawai', sourceKey: 'id_pegawai', as: 'gurubk_kelas', onDelete: 'SET NULL'})
M_DataKelas.belongsTo(M_DataPegawai, { foreignKey: 'fk_gurubk_id_pegawai', targetKey: 'id_pegawai'})

module.exports = {M_DataPegawai}