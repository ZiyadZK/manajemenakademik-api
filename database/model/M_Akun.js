const { DataTypes } = require("sequelize");
const { sequelize } = require("../database_config");
const { M_DataRiwayat } = require("./M_Riwayat");

const M_DataAkun = sequelize.define('data_akuns', {
    id_akun: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true
    },
    fk_akun_id_pegawai: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      references: {
        model: 'data_pegawai',
        key: 'id_pegawai'
      }
    },
    password_akun: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    role_akun: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'Operator'
    }
  }, {
    timestamps: false, // If you don't want timestamps
    tableName: 'data_akuns' // If table name is different from model name
});

M_DataAkun.hasMany(M_DataRiwayat, { foreignKey: 'fk_riwayat_id_akun', sourceKey: 'id_akun', as: 'riwayat' })
M_DataRiwayat.belongsTo(M_DataAkun, { foreignKey: 'fk_riwayat_id_akun', targetKey: 'id_akun', as: 'akun', onDelete: 'CASCADE'})

module.exports = {M_DataAkun}