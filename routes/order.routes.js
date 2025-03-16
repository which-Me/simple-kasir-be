const express = require("express");
const orderController = require("../controllers/order.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/order/create", authMiddleware, orderController.createOrder);

router.post("/order/delete", authMiddleware, orderController.cancelOrder);

router.post("/order/", authMiddleware, orderController.getAllOrder);

router.post("/order/byId", authMiddleware, orderController.getOrder);

router.post("/order/update", authMiddleware, orderController.updateOrder);

module.exports = router;
