const { user } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");
require("dotenv").config();

const registSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

exports.regist = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const { error } = registSchema.validate(req.body);
    if (error) {
      console.log(error);

      return res.status(400).json({
        status: 400,
        message: error.message,
      });
    }

    const isAlreadyUser = await user.findOne({
      where: { name: name },
      attributes: ["name"],
    });

    if (isAlreadyUser) {
      return res.status(400).json({
        status: 400,
        message: "name is already taken",
      });
    }

    const isAlreadyEmail = await user.findOne({
      where: { email: email },
      attributes: ["email"],
    });

    if (isAlreadyEmail) {
      return res.status(400).json({
        status: 400,
        message: "email has been registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    await user.create({
      account_uuid: uuidv4(),
      name: name,
      email: email,
      password: hashedPassword,
    });

    return res.status(201).json({
      status: 201,
      message: "account created",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "error form server",
      data: null,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = loginSchema.validate(req.body);
    if (error) {
      console.log(error);

      return res.status(400).json({
        status: 400,
        message: error.message,
      });
    }

    const response = await user.findOne({ where: { email: email } });

    if (!response) {
      return res.status(404).json({
        status: 404,
        message: "user not found",
      });
    }

    const compare = await bcrypt.compare(password, response.password);

    if (!compare) {
      return res.status(400).json({
        status: 400,
        message: "invalid credentials",
      });
    }

    const token = jwt.sign(
      { account_id: response.account_uuid, username: response.name },
      process.env.jwt_key,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      status: 200,
      message: "login succes",
      data: {
        token: token,
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
