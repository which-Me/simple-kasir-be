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
      kode_barang: {
        type: DataTypes.STRING(50),
        primaryKey: true,
        allowNull: false,
      },
      nama_barang: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      harga: DataTypes.INTEGER,
      diskon: DataTypes.INTEGER(3),
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
      modelName: "barang",
      timestamps: true,
    }
  );
  return barang;
};
