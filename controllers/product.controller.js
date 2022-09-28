const { Product } = require('../models')

exports.createProduct = async (req, res, next) => {
  const { title, price, description, category, image, rate, count } = req.body;
  try {
    const product = await Product.create({ title, price, description, category, image, rate, count });
    res.status(201).json(product)
  } catch(error) {
    next(error)
  }
}