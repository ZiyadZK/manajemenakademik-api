const { DataTypes } = require("sequelize");
const { sequelize } = require("../database_config");

exports.M_DataSiswa = sequelize.define('data_siswa', {
    kelas: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    rombel: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    no_rombel: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    nama_siswa: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    nis: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    nisn: {
      type: DataTypes.STRING(200),
      unique: true,
      allowNull: true
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
    status_dalam_keluarga: {
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
      allowNull: false
    },
    nama_ayah: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    nama_ibu: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    telp_ortu: {
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
    aktif: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    timestamps: false, // If you don't want timestamps
    tableName: 'data_siswa' // If table name is different from model name
  });