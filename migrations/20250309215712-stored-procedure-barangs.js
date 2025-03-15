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
      INSERT INTO barangs (kode_barang, nama_barang, stock, harga, diskon) 
      VALUES (p_kode_barang, p_nama_barang, p_stock, p_harga, p_diskon);
      SET p_message = 'product succesfully added';

      SELECT * FROM barangs WHERE kode_barang = p_kode_barang;
    END;
    `);
    await queryInterface.sequelize.query(`
    CREATE PROCEDURE sp_order_barang(
    IN p_kode_barang VARCHAR(50),
    IN p_jumlah INT UNSIGNED,
    IN p_jumlah_bayar INT UNSIGNED,
    OUT p_id_penjualan VARCHAR(50),
    OUT p_nama_barang VARCHAR(255),
    OUT p_harga_satuan INT UNSIGNED,
    OUT p_diskon INT UNSIGNED,
    OUT p_total_harga INT UNSIGNED,
    OUT p_sisa_kembalian INT UNSIGNED,
    OUT p_jumlah_order INT UNSIGNED,
    OUT p_tanggal_beli BIGINT UNSIGNED,
    OUT p_message VARCHAR(255)
    )

    BEGIN
    -- declare variable
    DECLARE v_exists INT;
    DECLARE v_harga INT;
    DECLARE v_harga_satuan INT;
    DECLARE v_stock INT;
    DECLARE v_diskon_amount INT;
    DECLARE v_diskon INT;
    DECLARE v_uuid VARCHAR(36);

    -- check items
    SELECT COUNT(*) INTO v_exists FROM barangs WHERE kode_barang = p_kode_barang;

    IF v_exists = 0 THEN
      SET p_message = 'barang tidak ditemukan';
      SET p_nama_barang = NULL;
      SET p_harga_satuan = NULL;
      SET p_total_harga = NULL;
      SET p_sisa_kembalian = NULL;
    ELSE
      -- get items
      SELECT nama_barang, stock, harga, diskon 
      INTO p_nama_barang, v_stock, v_harga, v_diskon 
      FROM barangs 
      WHERE kode_barang = p_kode_barang;
      SET p_harga_satuan = v_harga;
      SET p_diskon = v_diskon;

      IF v_stock < p_jumlah THEN
       SET p_message = 'stok tidak mencukupi';
       SET p_total_harga = NULL;
       SET p_sisa_kembalian = NULL;
      ELSE
        -- calculate discount
        SET v_diskon_amount = (v_harga * v_diskon) / 100;
        SET v_harga_satuan = v_harga - v_diskon_amount;
        SET p_total_harga = (v_harga_satuan * p_jumlah);

        IF p_total_harga > p_jumlah_bayar THEN
          SET p_message = 'pembayaran tidak cukup';
          SET p_sisa_kembalian = NULL;
        ELSE
          -- calculate kembalian
          SET p_sisa_kembalian = p_jumlah_bayar - p_total_harga;
          SET p_message = 'order berhasil';

          -- Generate ID dengan format ORDER-uuidv4
          SET v_uuid = UUID();
          SET p_id_penjualan = CONCAT('ORDER-', v_uuid);

          -- Generate EPOCH 
          SET p_tanggal_beli = UNIX_TIMESTAMP();

          SET p_jumlah_order = p_jumlah;


          UPDATE barangs SET stock = stock - p_jumlah WHERE kode_barang = p_kode_barang;

          -- insert table order
          INSERT INTO penjualans (id_penjualan, kode_barang, jumlah, total, total_bayar, kembalian, tanggal_beli) 
          VALUES (p_id_penjualan, p_kode_barang, p_jumlah, p_total_harga, p_jumlah_bayar, p_sisa_kembalian, p_tanggal_beli);
        
          END IF;
      END IF;
  END IF;
END;
     `);
    await queryInterface.sequelize.query(`
      CREATE PROCEDURE sp_order_cancel(
      IN p_id_penjualan VARCHAR(50),
      OUT p_message VARCHAR(255)
      )

      BEGIN
      -- declater variabel
      DECLARE v_exists INT;
      DECLARE v_total_stock INT;
      DECLARE v_order_stock INT;
      DECLARE v_kode_barang VARCHAR(50);

      SET p_message = NULL;

      SELECT COUNT(*) INTO v_exists FROM penjualans WHERE id_penjualan = p_id_penjualan;
      IF v_exists = 0 THEN 
        SET p_message = 'order tidak ditemukan';
      ELSE
        SELECT p.id_penjualan, b.kode_barang, b.nama_barang, p.jumlah, p.total, p.tanggal_beli 
        FROM penjualans p 
        JOIN barangs b ON p.kode_barang = b.kode_barang 
        WHERE p.id_penjualan = p_id_penjualan;
        
        SELECT b.stock, p.jumlah, p.kode_barang 
        INTO v_total_stock, v_order_stock, v_kode_barang 
        FROM penjualans p 
        JOIN barangs b ON p.kode_barang = b.kode_barang 
        WHERE id_penjualan = p_id_penjualan;

        -- UPDATE 
        UPDATE barangs 
        SET stock = v_total_stock + v_order_stock 
        WHERE kode_barang = v_kode_barang;

        -- DELETE
        DELETE FROM penjualans 
        WHERE id_penjualan = p_id_penjualan;

        SET p_message = 'order berhasil dihapus';
        
      END IF;
      END;
      `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP PROCEDURE IF EXISTS sp_create_barang;
    `);
    await queryInterface.sequelize.query(`
      DROP PROCEDURE IF EXISTS sp_order_barang;
    `);
    await queryInterface.sequelize.query(`
      DROP PROCEDURE IF EXISTS sp_order_cancel;
      `);
  },
};
