"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // create barang procedure
    await queryInterface.sequelize.query(`
    CREATE PROCEDURE sp_create_barang(
    IN p_kode_barang VARCHAR(50),
    IN p_nama_barang VARCHAR(255),
    IN p_stock INT UNSIGNED,
    IN p_harga INT UNSIGNED,
    IN p_diskon INT(3) UNSIGNED,
    OUT p_message VARCHAR(255)
    )

    BEGIN
      INSERT INTO barangs (kode_barang, nama_barang, stock, harga, diskon) VALUES (p_kode_barang, p_nama_barang, p_stock, p_harga, p_diskon);
      SET p_message = 'product succesfully added';

      SELECT * FROM barangs WHERE kode_barang = p_kode_barang;
    END;
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP PROCEDURE IF EXISTS sp_create_barang;
      `);
  },
};
