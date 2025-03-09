const express = require("express");
const barangController = require("../controllers/barang.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();

// GET semua barang
router.post("/", authMiddleware, barangController.getAllBarang);

router.post("/getDataById", authMiddleware, barangController.getBarang);

router.post("/createBarang", authMiddleware, barangController.createBarang);

module.exports = router;
