const { M_DataAkun } = require("./model/M_Akun")
const { M_DataKelas } = require("./model/M_Kelas")
const { M_DataPegawai } = require("./model/M_Pegawai")
const { M_Pendidikan_Pegawai } = require("./model/M_Pendidikan_Pegawai")
const { M_Sertifikat_Pegawai } = require("./model/M_Sertifikat_Pegawai")


exports.sequelizeInitRelation = () => {
    M_DataPegawai.hasMany(M_Pendidikan_Pegawai, { foreignKey: 'fk_pendidikan_id_pegawai', onDelete: 'CASCADE' })
    M_DataPegawai.hasMany(M_Sertifikat_Pegawai, { foreignKey: 'fk_sertifikat_id_pegawai', onDelete: 'CASCADE' })
    M_DataPegawai.hasOne(M_DataAkun, { foreignKey: 'fk_akun_id_pegawai', onDelete: 'CASCADE' })
    M_DataPegawai.hasMany(M_DataKelas, { foreignKey: 'fk_walikelas_id_pegawai', onDelete: 'SET NULL' })
    M_DataPegawai.hasMany(M_DataKelas, { foreignKey: 'fk_gurubk_id_pegawai', onDelete: 'SET NULL' })
    
    M_Pendidikan_Pegawai.belongsTo(M_DataPegawai, { foreignKey: 'fk_pendidikan_id_pegawai' })
    M_Sertifikat_Pegawai.belongsTo(M_DataPegawai, { foreignKey: 'fk_sertifikat_id_pegawai' })
    M_DataAkun.belongsTo(M_DataPegawai, { foreignKey: 'fk_akun_id_pegawai' })
    M_DataKelas.belongsTo(M_DataPegawai, { foreignKey: 'fk_walikelas_id_pegawai' })
    M_DataKelas.belongsTo(M_DataPegawai, { foreignKey: 'fk_gurubk_id_pegawai' })

}
