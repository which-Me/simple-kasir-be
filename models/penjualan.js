"use strict";
const { Model, Sequelize } = require("sequelize");
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
      id_penjualan: {
        type: DataTypes.STRING(50),
        primaryKey: true,
        allowNull: false,
      },
      kode_barang: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      jumlah: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
      total_bayar: DataTypes.INTEGER,
      kembalian: DataTypes.INTEGER,
      tanggal_beli: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: Sequelize.literal("UNIX_TIMESTAMP()"),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.BIGINT,
        defaultValue: Sequelize.literal("UNIX_TIMESTAMP()"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.BIGINT,
        defaultValue: Sequelize.literal("UNIX_TIMESTAMP()"),
        onUpdate: Sequelize.literal("UNIX_TIMESTAMP()"),
      },
    },
    {
      sequelize,
      modelName: "penjualan",
      timestamps: true,
    }
  );
  return penjualan;
};
