const { DataTypes } = require("sequelize");
const { sequelize } = require("../database_config");

const M_DataAkun = sequelize.define('data_akuns', {
    id_akun: {
      type: DataTypes.INTEGER(3),
      primaryKey: true,
      allowNull: false
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

module.exports = {M_DataAkun}