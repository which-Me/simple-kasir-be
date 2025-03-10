"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class barang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  barang.init(
    {
      kode_barang: DataTypes.STRING,
      nama_barang: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      harga: DataTypes.INTEGER,
      diskon: DataTypes.INTEGER,
      createdAt: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: Sequelize.literal("UNIX_TIMESTAMP()"),
      },
      updatedAt: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: Sequelize.literal("UNIX_TIMESTAMP()"),
      },
    },
    {
      sequelize,
      modelName: "barang",
      timestamps: true,
    }
  );
  return barang;
};
