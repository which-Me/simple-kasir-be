const { barang } = require("../models");
const Joi = require("joi");
const { v4: uuid4 } = require("uuid");

const idSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

const barangSchema = Joi.object({
  nama_barang: Joi.string().required(),
  stock: Joi.number().integer().required(),
  harga: Joi.number().integer().required(),
  diskon: Joi.number().integer().required(),
});

console.log(uuid4(), uuid4().length);

exports.getAllBarang = async (req, res) => {
  try {
    const barangs = await barang.findAll({ order: [["id", "DESC"]] });

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
      return res.status(401).json({
        status: 401,
        message: error.message,
        data: null,
      });
    }

    const barangs = await barang.findOne({
      where: { id: req.body.id },
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
  } catch (error) {}
};
