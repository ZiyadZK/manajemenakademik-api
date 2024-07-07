const { DataTypes } = require("sequelize");
const { sequelize } = require("../database_config");
const { M_DataIjazah } = require("./M_Ijazah");

const M_DataAlumni = sequelize.define('data_alumni', {
    kelas: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    jurusan: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    rombel: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    nama_siswa: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    nis: {
      type: DataTypes.STRING(200),
      primaryKey: true
    },
    nisn: {
      type: DataTypes.STRING(200),
      allowNull: true,
      unique: 'nisn'
    },
    nik: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    no_kk: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    tempat_lahir: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    tanggal_lahir: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    jenis_kelamin: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    agama: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    jumlah_saudara: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    anak_ke: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    alamat: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    no_hp_siswa: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    asal_sekolah: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    kategori: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    tahun_masuk: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tahun_keluar: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tanggal_keluar: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nama_ayah: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    nama_ibu: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    nama_wali: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    telp_ayah: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    telp_ibu: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    telp_wali : {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    pekerjaan_ayah: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    pekerjaan_ibu: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    pekerjaan_wali: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    timestamps: false, // If you don't want timestamps
    tableName: 'data_alumni' // If table name is different from model name
  });

  M_DataAlumni.hasOne(M_DataIjazah, { foreignKey: 'fk_ijazah_nis', as: 'data_ijazah', onDelete: 'CASCADE' })
  M_DataIjazah.belongsTo(M_DataAlumni, { foreignKey: 'fk_ijazah_nis', targetKey: 'nis' })

module.exports = {M_DataAlumni}