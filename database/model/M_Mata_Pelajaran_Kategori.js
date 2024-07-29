const { DataTypes } = require("sequelize");
const { sequelize } = require("../database_config");
const { M_Mata_Pelajaran_Template_Kategori } = require("./M_Mata_Pelajaran_Template_Kategori");

const M_Mata_Pelajaran_Kategori = sequelize.define('data_mapel_kategori', {
    id_kategori_mapel: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nama_kategori: {
        type: DataTypes.STRING,
        allowNull: true
    },
    aktif: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: true,
    tableName: 'data_mapel_kategori'
})

M_Mata_Pelajaran_Kategori.hasMany(M_Mata_Pelajaran_Template_Kategori, { foreignKey: 'fk_kategori_id_kategori_mapel', sourceKey: 'id_kategori_mapel', onDelete: 'CASCADE'})
M_Mata_Pelajaran_Template_Kategori.belongsTo(M_Mata_Pelajaran_Kategori, { foreignKey: 'fk_kategori_id_kategori_mapel', targetKey: 'id_kategori_mapel'})

module.exports = { M_Mata_Pelajaran_Kategori }