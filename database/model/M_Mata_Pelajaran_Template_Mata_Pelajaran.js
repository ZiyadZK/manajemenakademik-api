const { DataTypes } = require("sequelize");
const { sequelize } = require("../database_config");
const { M_Mata_Pelajaran_Template_Kategori } = require("./M_Mata_Pelajaran_Template_Kategori");
const { M_MataPelajaran } = require("./M_Mata_Pelajaran");

const M_Mata_Pelajaran_Template_Mapel = sequelize.define('data_mapel_template_mapel', {
    no: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    no_urut: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fk_mapel_id_mapel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: M_MataPelajaran,
            key: 'id_mapel'
        }
    },
    fk_no_template_kategori: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: M_Mata_Pelajaran_Template_Kategori,
            key: 'no'
        }
    }
}, {
    tableName: 'data_mapel_template_mapel'
})

M_MataPelajaran.hasMany(M_Mata_Pelajaran_Template_Mapel, { foreignKey: 'fk_mapel_id_mapel', sourceKey: 'id_mapel', onDelete: 'CASCADE'})
M_Mata_Pelajaran_Template_Mapel.belongsTo(M_MataPelajaran, { foreignKey: 'fk_mapel_id_mapel', targetKey: 'id_mapel'})

module.exports = { M_Mata_Pelajaran_Template_Mapel }