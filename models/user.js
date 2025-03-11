"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      account_uuid: {
        type: DataTypes.STRING(50),
        primaryKey: true,
        allowNull: false,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
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
      modelName: "user",
      timestamps: true,
    }
  );
  return user;
};
