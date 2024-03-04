const uuid = require("uuid").v1;
const Product = require("../models/Product");

// Fonction pour préfixer l'URL de l'image
const constructImageUrl = (req, imageUrl) =>
  `${req.protocol}://${req.get("host")}/images/${imageUrl}`;

// Récupérer tous les produits
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}, "name price imageUrl"); // Ne récupérer que les champs nécessaires
    const mappedProducts = products.map(product => ({
      ...product._doc, //  ._doc pour accéder aux propriétés réelles de l'objet.
      imageUrl: constructImageUrl(req, product.imageUrl),
    }));
    res.status(200).json(mappedProducts);
  } catch (error) {
    res.status(500).json({ message: "Database error!", error: error.message });
  }
};

// Récupérer un seul produit
exports.getOneProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(
      id,
      "name price imageUrl description"
    ); // Limiter les champs retournés
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }
    product.imageUrl = constructImageUrl(req, product.imageUrl);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Database error!", error: error.message });
  }
};

// Gestion de la validation de la commande par formulaire
exports.orderProducts = async (req, res) => {
  const { contact, products } = req.body;

  if (
    !contact ||
    Object.values(contact).some(val => !val) ||
    !products ||
    !Array.isArray(products)
  ) {
    return res.status(400).json({ message: "Bad request!" });
  }

  try {
    const productDetails = await Promise.all(
      products.map(productId =>
        Product.findById(productId, "name price imageUrl")
      )
    );

    const missingProducts = productDetails.filter(product => !product);
    if (missingProducts.length > 0) {
      return res
        .status(404)
        .json({ message: "One or more products not found!", missingProducts });
    }

    const updatedProducts = productDetails.map(product => ({
      ...product._doc,
      imageUrl: constructImageUrl(req, product.imageUrl),
    }));

    const orderId = uuid();
    res.status(201).json({ contact, products: updatedProducts, orderId });
  } catch (error) {
    res.status(500).json({ message: "Database error!", error: error.message });
  }
};
