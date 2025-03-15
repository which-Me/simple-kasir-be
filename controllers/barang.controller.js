const { barang, sequelize } = require("../models");
const Joi = require("joi");
const { where } = require("sequelize");
const { v4: uuid4 } = require("uuid");

const idSchema = Joi.object({
  kode_barang: Joi.string().max(50).required(),
});

const barangSchema = Joi.object({
  nama_barang: Joi.string().required(),
  stock: Joi.number().integer().required(),
  harga: Joi.number().integer().required(),
  diskon: Joi.number().integer().required(),
});

const updateSchema = Joi.object({
  kode_barang: Joi.string().max(50).required(),
  nama_barang: Joi.string().required(),
  stock: Joi.number().integer().required(),
  harga: Joi.number().integer().required(),
  diskon: Joi.number().integer().required(),
});

const addStockSchema = Joi.object({
  kode_barang: Joi.string().max(50).required(),
  stock: Joi.number().integer().required(),
});

exports.getAllBarang = async (req, res) => {
  try {
    const barangs = await barang.findAll({ order: [["createdAt", "DESC"]] });

    if (barangs.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "data is empty",
        data: null,
      });
    }

    return res.status(200).json({
      status: 200,
      message: "get data succesfully",
      data: barangs,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "error form server",
      data: null,
    });
  }
};

exports.getBarang = async (req, res) => {
  try {
    const { error } = idSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
        data: null,
      });
    }

    const barangs = await barang.findOne({
      where: { kode_barang: req.body.kode_barang },
    });

    if (!barangs) {
      return res.status(404).json({
        status: 404,
        message: "data not found",
        data: null,
      });
    }

    return res.status(200).json({
      status: 200,
      message: "get data succesfully",
      data: barangs,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "error form server",
      data: null,
    });
  }
};

exports.createBarang = async (req, res) => {
  try {
    const { error } = barangSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
        data: null,
      });
    }

    const [result] = await sequelize.query(
      `
      CALL sp_create_barang(:kode_barang, :nama_barang, :stock, :harga, :diskon, @message);`,
      {
        replacements: {
          kode_barang: `BRG-${uuid4()}`,
          nama_barang: req.body.nama_barang,
          stock: req.body.stock,
          harga: req.body.harga,
          diskon: req.body.diskon,
        },
        type: sequelize.QueryTypes.RAW,
      }
    );

    const [message] = await sequelize.query(
      `
      SELECT @message AS message;`,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );

    return res.status(200).json({
      status: 200,
      message: message.message,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "error form server",
      data: null,
    });
  }
};

exports.updateBarang = async (req, res) => {
  try {
    const { kode_barang, nama_barang, stock, harga, diskon } = req.body;
    const { error } = updateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
        data: null,
      });
    }

    const [result] = await barang.update(
      {
        nama_barang: nama_barang,
        stock: stock,
        harga: harga,
        diskon: diskon,
      },
      {
        where: {
          kode_barang: kode_barang,
        },
      }
    );

    if (!result) {
      return res.status(404).json({
        status: 404,
        message: "data not found",
        data: null,
      });
    }

    if (result) {
      const result = await barang.findOne({
        where: { kode_barang: req.body.kode_barang },
      });

      return res.status(200).json({
        status: 200,
        message: "data updated",
        data: result,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "error form server",
      data: null,
    });
  }
};

exports.deleteBarang = async (req, res) => {
  try {
    const { kode_barang } = req.body;
    const { error } = idSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
      });
    }

    const result = await barang.destroy({
      where: {
        kode_barang: kode_barang,
      },
    });

    if (!result) {
      return res.status(404).json({
        status: 404,
        message: "data not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "data deleted",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "error form server",
    });
  }
};

exports.addStock = async (req, res) => {
  try {
    const { kode_barang, stock } = req.body;
    const { error } = addStockSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
      });
    }

    await sequelize.query(
      `
      CALL sp_add_stock(:kode_barang, :stock, @message)
      `,
      {
        replacements: {
          kode_barang: kode_barang,
          stock: stock,
        },
        type: sequelize.QueryTypes.RAW,
      }
    );

    const [message] = await sequelize.query(
      `
       SELECT @message AS message
        `,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (message.message === "data not found") {
      return res.status(404).json({
        status: 404,
        message: message.message,
      });
    }

    return res.status(200).json({
      status: 200,
      message: message.message,
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
