const express = require("express");
const productController = require("../controllers/product");
const { body, validationResult, param, query } = require("express-validator");

const router = express.Router();

// Route pour obtenir tous les produits
router.get(
  "/",
  [
    query("page")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Page must be a positive integer"),
    query("limit")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Limit must be a positive integer"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  productController.getAllProducts
);

// Route pour obtenir un produit par ID
router.get(
  "/:id",
  [param("id").isString().withMessage("Invalid ID format")],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  productController.getOneProduct
);

// Route pour commander des produits
router.post(
  "/order",
  [
    body("contact.firstName").trim().isLength({ min: 1 }).escape(),
    body("contact.lastName").trim().isLength({ min: 1 }).escape(),
    body("contact.address").trim().isLength({ min: 1 }).escape(),
    body("contact.city").trim().isLength({ min: 1 }).escape(),
    body("contact.email").isEmail().normalizeEmail(),
    body("products")
      .isArray({ min: 1 })
      .withMessage("Products array is required and cannot be empty"),
    body("products.*")
      .isMongoId()
      .withMessage("Each product ID must be a valid MongoDB ID"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  productController.orderProducts
);

module.exports = router;
