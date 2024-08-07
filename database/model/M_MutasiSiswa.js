const { DataTypes } = require("sequelize");
const { sequelize } = require("../database_config");
const {M_Nilai} = require("./M_Nilai");

const M_DataMutasiSiswa = sequelize.define('data_mutasi_siswa', {
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
      type: DataTypes.STRING,
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
      allowNull: false
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
    },
    keterangan: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    timestamps: false, // If you don't want timestamps
    tableName: 'data_mutasi_siswa' // If table name is different from model name
  });

  M_DataMutasiSiswa.hasMany(M_Nilai, { foreignKey: 'fk_nilai_nis_mutasi_siswa', sourceKey: 'nis', as: 'nilai_mutasi_siswa', onDelete: 'SET NULL'})
  M_Nilai.belongsTo(M_DataMutasiSiswa, { foreignKey: 'fk_nilai_nis_mutasi_siswa', targetKey: 'nis'})

module.exports = {M_DataMutasiSiswa}