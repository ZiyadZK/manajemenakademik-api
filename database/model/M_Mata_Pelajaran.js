const { DataTypes } = require("sequelize");
const { sequelize } = require("../database_config");

const M_MataPelajaran = sequelize.define('data_mapel', {
    id_mapel: {
        type: DataTypes.INTEGER(6),
        autoIncrement: true,
        primaryKey: true
    },
    nama_mapel: {
        type: DataTypes.STRING,
        allowNull: true
    },
    is_parent: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    parent_from_id_mapel: {
        type: DataTypes.STRING,
        allowNull: true
    },
    is_mapel: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    aktif: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    timestamps: true,
    tableName: 'data_mapel'
})

module.exports = {M_MataPelajaran}