const { barang, sequelize } = require("../models");
const Joi = require("joi");

const orderSchema = Joi.object({
  kode_barang: Joi.string().max(50).required(),
  jumlah_barang: Joi.number().integer().positive().required(),
  jumlah_bayar: Joi.number().integer().positive().required(),
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
    CALL sp_order_barang(:kode_barang, :jumlah_barang, :jumlah_bayar, @nama_barang, @harga_satuan, @total_harga, @sisa_kembalian, @jumlah_order, @tanggal_beli, @message);`,
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
        SELECT @nama_barang AS nama_barang, @harga_satuan AS harga_satuan, @total_harga AS total_harga, @sisa_kembalian AS sisa_kembalian, @jumlah_order AS jumlah_order, @tanggal_beli AS tanggal_beli, @message AS message`,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );

    return res.status(200).json({
      status: 200,
      message: message.message,
      data: {
        kode_barang: req.body.kode_barang,
        nama_barang: message.nama_barang,
        harga_satuan: message.harga_satuan,
        jumlah_order: message.jumlah_order,
        total_harga: message.total_harga,
        jumlah_bayar: req.body.jumlah_bayar,
        sisa_kembalian: message.sisa_kembalian,
        tanggal_beli: message.tanggal_beli,
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
