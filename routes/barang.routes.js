const express = require("express");
const barangController = require("../controllers/barang.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();

// GET semua barang
router.post("/", authMiddleware, barangController.getAllBarang);

router.post("/byId", authMiddleware, barangController.getBarang);

router.post("/create", authMiddleware, barangController.createBarang);

module.exports = router;
