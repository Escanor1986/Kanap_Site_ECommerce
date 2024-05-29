const express = require("express");
const router = express.Router();

const productCtrl = require("../controllers/product");

router.get("/", productCtrl.getAllProducts);
router.get("/:id", productCtrl.getOneProduct);
router.post("/order", productCtrl.orderProducts);
router.post("/", productCtrl.createProduct);

module.exports = router;
