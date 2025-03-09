"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class penjualan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  penjualan.init(
    {
      id_penjualan: DataTypes.STRING,
      kode_barang: DataTypes.STRING,
      jumlah: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
      total_bayar: DataTypes.INTEGER,
      kembalian: DataTypes.INTEGER,
      tanggal_beli: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "penjualan",
    }
  );
  return penjualan;
};
