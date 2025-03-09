"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("barangs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      kode_barang: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false,
      },
      nama_barang: {
        type: Sequelize.STRING,
      },
      stock: {
        type: Sequelize.INTEGER.UNSIGNED,
      },
      harga: {
        type: Sequelize.INTEGER.UNSIGNED,
      },
      diskon: {
        type: Sequelize.INTEGER(3).UNSIGNED,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("barangs");
  },
};
