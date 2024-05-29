const { v1: uuidv1 } = require("uuid");
const Product = require("../models/Product");
const { productSchema } = require("../validator/Products");
const Joi = require("joi");


exports.getAllProducts = (req, res) => {
  Product.find()
    .then(products => {
      const mappedProducts = products.map(product => {
        product.imageUrl = `${req.protocol}://${req.get("host")}/images/${product.imageUrl}`;
        return product;
      });
      res.status(200).json(mappedProducts);
    })
    .catch(() => {
      res.status(500).send(new Error("Database error!"));
    });
};

exports.getOneProduct = (req, res) => {
  Product.findById(req.params.id)
    .then(product => {
      if (!product) {
        return res.status(404).send(new Error("Product not found!"));
      }
      product.imageUrl = `${req.protocol}://${req.get("host")}/images/${product.imageUrl}`;
      res.status(200).json(product);
    })
    .catch(() => {
      res.status(500).send(new Error("Database error!"));
    });
};

exports.orderProducts = (req, res) => {
  const { contact, products } = req.body;

  const contactSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    email: Joi.string().email().required(),
  });

  const validationResult = contactSchema.validate(contact);
  if (validationResult.error) {
    return res.status(400).send(new Error("Bad request!"));
  }

  if (!products || !Array.isArray(products)) {
    return res.status(400).send(new Error("Bad request!"));
  }

  let queries = products.map(productId => {
    return Product.findById(productId)
      .then(product => {
        if (!product) {
          return Promise.reject("Product not found: " + productId);
        }
        product.imageUrl = `${req.protocol}://${req.get("host")}/images/${product.imageUrl}`;
        return product;
      })
      .catch(() => {
        return Promise.reject("Database error!");
      });
  });

  Promise.all(queries)
    .then(products => {
      const orderId = uuidv1();
      res.status(201).json({
        contact: req.body.contact,
        products: products,
        orderId: orderId,
      });
    })
    .catch(error => {
      res.status(500).json(new Error(error));
    });
};

exports.createProduct = (req, res) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).send(new Error("Bad request!"));
  }

  const productObject = req.body;
  const product = new Product({
    ...productObject,
    pictures: productObject.pictures.split(","),
    equipments: productObject.equipments.split(","),
    tags: productObject.tags.split(","),
  });

  product
    .save()
    .then(() => {
      res.status(201).json({ message: "Nouvelle location créée avec succès !" });
    })
    .catch(error => {
      res.status(500).json({ error: error });
    });
};
