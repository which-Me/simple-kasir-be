const express = require("express");
const orderController = require("../controllers/order.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/order/create", authMiddleware, orderController.createOrder);

module.exports = router;
