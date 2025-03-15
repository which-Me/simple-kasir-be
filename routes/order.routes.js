const express = require("express");
const orderController = require("../controllers/order.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/order/create", authMiddleware, orderController.createOrder);

router.post("/order/delete", authMiddleware, orderController.cancelOrder);

module.exports = router;
