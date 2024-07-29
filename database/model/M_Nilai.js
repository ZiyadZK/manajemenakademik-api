const { DataTypes } = require("sequelize");
const { sequelize } = require("../database_config");
const { M_MataPelajaran } = require("./M_Mata_Pelajaran");

const M_Nilai = sequelize.define('data_nilai', {
    id_nilai: {
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        allowNull: true,
        primaryKey: true
    },
    fk_id_mapel: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        references: {
            model: 'data_mapel',
            key: 'id_mapel'
        }
    },
    fk_nilai_nis_siswa: {
        type: DataTypes.STRING(10),
        allowNull: true,
        references: {
            model: 'data_siswa',
            key: 'nis'
        }
    },
    fk_nilai_nis_mutasi_siswa: {
        type: DataTypes.STRING(10),
        allowNull: true,
        references: {
            model: 'data_mutasi_siswa',
            key: 'nis'
        }
    },
    fk_nilai_nis_alumni: {
        type: DataTypes.STRING(10),
        allowNull: true,
        references: {
            model: 'data_alumni',
            key: 'nis'
        }
    },
    semester_1: {
        type: DataTypes.STRING(5),
        allowNull: true
    },
    semester_2: {
        type: DataTypes.STRING(5),
        allowNull: true
    },
    semester_3: {
        type: DataTypes.STRING(5),
        allowNull: true
    },
    semester_4: {
        type: DataTypes.STRING(5),
        allowNull: true
    },
    semester_5: {
        type: DataTypes.STRING(5),
        allowNull: true
    },
    semester_6: {
        type: DataTypes.STRING(5),
        allowNull: true
    },
    nilai_akhir: {
        type: DataTypes.STRING(5),
        allowNull: true
    },
    nilai_ujian: {
        type: DataTypes.STRING(5),
        allowNull: true
    }
}, {
    tableName: 'data_nilai'
})


M_MataPelajaran.hasMany(M_Nilai, { foreignKey: 'fk_id_mapel', sourceKey: 'id_mapel', as: 'mata_pelajaran', onDelete: 'CASCADE'})
M_Nilai.belongsTo(M_MataPelajaran, { foreignKey: 'fk_id_mapel', targetKey: 'id_mapel'})

module.exports = {M_Nilai}