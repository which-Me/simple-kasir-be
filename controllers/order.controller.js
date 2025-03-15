const { barang, sequelize } = require("../models");
const Joi = require("joi");

const orderSchema = Joi.object({
  kode_barang: Joi.string().max(50).required(),
  jumlah_barang: Joi.number().integer().positive().required(),
  jumlah_bayar: Joi.number().integer().positive().required(),
});

const orderCancel = Joi.object({
  id_penjualan: Joi.string().max(50).required(),
});

exports.createOrder = async (req, res) => {
  try {
    const { error } = orderSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
        data: null,
      });
    }

    await sequelize.query(
      `
    CALL sp_order_barang(:kode_barang, :jumlah_barang, :jumlah_bayar, @id_penjualan, @nama_barang, @harga_satuan, @diskon, @total_harga, @sisa_kembalian, @jumlah_order, @tanggal_beli, @message);`,
      {
        replacements: {
          kode_barang: req.body.kode_barang,
          jumlah_barang: req.body.jumlah_barang,
          jumlah_bayar: req.body.jumlah_bayar,
        },
        type: sequelize.QueryTypes.RAW,
      }
    );

    const [message] = await sequelize.query(
      `
          SELECT 
          @id_penjualan AS id_penjualan,
          @nama_barang AS nama_barang,
          @harga_satuan AS harga_satuan,
          @diskon AS diskon,
          @total_harga AS total_harga,
          @sisa_kembalian AS sisa_kembalian,
          @jumlah_order AS jumlah_order,
          @tanggal_beli AS tanggal_beli,
          @message AS message;
          `,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );

    const {
      id_penjualan,
      nama_barang,
      harga_satuan,
      jumlah_order,
      total_harga,
      diskon,
      sisa_kembalian,
      tanggal_beli,
    } = message;

    if (message.message === "barang tidak ditemukan") {
      return res.status(404).json({
        status: 404,
        message: message.message,
        data: null,
      });
    }

    if (message.message !== "order berhasil") {
      return res.status(400).json({
        status: 400,
        message: message.message,
        data: {
          id_penjualan: id_penjualan,
          kode_barang: req.body.kode_barang,
          nama_barang: nama_barang,
          harga_satuan: harga_satuan,
          jumlah_order: jumlah_order,
          total_harga: total_harga,
          diskon: diskon,
          jumlah_bayar: req.body.jumlah_bayar,
          sisa_kembalian: sisa_kembalian,
          tanggal_beli: tanggal_beli,
        },
      });
    }

    return res.status(200).json({
      status: 200,
      message: message.message,
      data: {
        id_penjualan: id_penjualan,
        kode_barang: req.body.kode_barang,
        nama_barang: nama_barang,
        harga_satuan: harga_satuan,
        jumlah_order: jumlah_order,
        total_harga: total_harga,
        diskon: diskon,
        jumlah_bayar: req.body.jumlah_bayar,
        sisa_kembalian: sisa_kembalian,
        tanggal_beli: tanggal_beli,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "error form server",
      data: null,
    });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const { error } = orderCancel.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
        data: null,
      });
    }

    const result = await sequelize.query(
      `
      CALL sp_order_cancel(:id_penjualan, @message);
      `,
      {
        replacements: {
          id_penjualan: req.body.id_penjualan,
        },
        type: sequelize.QueryTypes.RAW,
      }
    );

    const [message] = await sequelize.query(
      `
      SELECT @message AS message;
      `,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (!result) {
      return res.status(404).json({
        status: 404,
        message: message.message,
        data: null,
      });
    }

    return res.status(200).json({
      status: 200,
      message: message.message,
      data: result[0],
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      status: 500,
      message: "error form server",
      data: null,
    });
  }
};
