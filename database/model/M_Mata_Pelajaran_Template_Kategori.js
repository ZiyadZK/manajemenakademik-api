const { DataTypes } = require("sequelize");
const { sequelize } = require("../database_config");
const { M_Mata_Pelajaran_Kategori } = require("./M_Mata_Pelajaran_Kategori");
const { M_Mata_Pelajaran_Template_Mapel } = require("./M_Mata_Pelajaran_Template_Mata_Pelajaran");

const M_Mata_Pelajaran_Template_Kategori = sequelize.define('data_mapel_template_kategori', {
    no: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    no_urut: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tahun_angkatan: {
        type: DataTypes.STRING(6),
        allowNull: false,
    },
    kelas: {
        type: DataTypes.STRING(5),
        allowNull: false
    },
    jurusan: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    fk_kategori_id_kategori_mapel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: M_Mata_Pelajaran_Kategori,
            key: 'id_kategori_mapel'
        }
    }
}, {
    tableName: 'data_mapel_template_kategori'
})

M_Mata_Pelajaran_Template_Kategori.hasMany(M_Mata_Pelajaran_Template_Mapel, { foreignKey: 'fk_no_template_kategori', sourceKey: 'no', onDelete: 'CASCADE'})
M_Mata_Pelajaran_Template_Mapel.belongsTo(M_Mata_Pelajaran_Template_Kategori, { foreignKey: 'fk_no_template_kategori', targetKey: 'no'})

module.exports = { M_Mata_Pelajaran_Template_Kategori }