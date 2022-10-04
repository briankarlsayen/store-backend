const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getSpecificProduct,
  updateProduct,
  archiveProduct,
} = require("../controllers/product.controller");

router.route("/").post(createProduct);
router.route("/").get(getProducts);
router.route("/:id").get(getSpecificProduct);
router.route("/:id").put(updateProduct);
router.route("/:id").delete(archiveProduct);
module.exports = router;