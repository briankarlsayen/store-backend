const express = require("express");
const router = express.Router();

const {
  createProduct,
} = require("../controllers/product.controller");

router.route("/").post(createProduct);
module.exports = router;