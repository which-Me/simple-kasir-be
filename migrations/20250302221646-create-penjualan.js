"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("penjualans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      id_penjualan: {
        type: Sequelize.STRING(50),
      },
      kode_barang: {
        type: Sequelize.STRING(50),
      },
      jumlah: {
        type: Sequelize.INTEGER.UNSIGNED,
      },
      total: {
        type: Sequelize.INTEGER.UNSIGNED,
      },
      total_bayar: {
        type: Sequelize.INTEGER,
      },
      kembalian: {
        type: Sequelize.INTEGER,
      },
      tanggal_beli: {
        type: Sequelize.INTEGER.UNSIGNED,
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
      },
    });
    await queryInterface.addConstraint("penjualans", {
      fields: ["kode_barang"],
      type: "foreign key",
      name: "fk_kode_barang",
      onUpdate: "cascade",
      onDelete: "cascade",
      references: {
        table: "barangs",
        field: "kode_barang",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("penjualans");
  },
};
