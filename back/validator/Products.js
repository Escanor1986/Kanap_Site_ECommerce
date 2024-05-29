const Joi = require("joi");

const productSchema = Joi.object({
  title: Joi.string().required().trim(),
  liked: Joi.boolean().required(),
  cover: Joi.string().required().uri(),
  pictures: Joi.array().items(Joi.string().uri()).required(),
  description: Joi.string().required().trim(),
  host: Joi.object({
    name: Joi.string().required().trim(),
    picture: Joi.string().required().uri(),
  }).required(),
  rating: Joi.number().min(0).max(5).required(),
  location: Joi.string().required().trim(),
  equipments: Joi.array().items(Joi.string().trim()).required(),
  tags: Joi.array().items(Joi.string().trim()).required(),
  userId: Joi.string().required(),
});

module.exports = {
  productSchema,
};
