const { Product } = require('../models')
const { checkingValidation } = require('../utilities/formChecker')

exports.createProduct = async (req, res, next) => {
  const { title, price, description, category, image, rate, count } = req.body;
  try {
    const requiredField = {
      title, price, description, category, rate, count
    };
    const error_field = checkingValidation(requiredField);
    if (error_field) {
      return res.status(422).json({ message: error_field });
    }

    const product = await Product.create({ title, price, description, category, image, rate, count });
    res.status(201).json({ success: true, data: product })
  } catch(error) {
    next(error)
  }
}

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({ where: { isDeleted: false }});
    res.status(200).json({ success: true, data: products })
  } catch(error) {
    next(error)
  }
}

exports.getSpecificProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ where: { id, isDeleted: false } });
    if(!product) return res.status(422).json({ success: false, message: "Unable to get product "})
    res.status(200).json({ success: true, data: product })
  } catch(error) {
    next(error)
  }
}

exports.updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { title, price, description, category, image, rate, count } = req.body;
  try {
    const product = await Product.findOne({ where: { id, isDeleted: false } });
    if(!product) return res.status(422).json({ success: false, message: "Unable to get product "})

    const requiredField = {
      title, price, description, category, rate, count
    };
    const error_field = checkingValidation(requiredField);
    if (error_field) {
      return res.status(422).json({ message: error_field });
    }

    product.title = title;
    product.price = price;
    product.description = description;
    product.category = category;
    product.image = image;
    product.rate = rate;
    product.count = count;
    product.save()
    const updatedProduct = await Product.findOne({ where: { id, isDeleted: false } });
    res.status(201).json({success: true, data: updatedProduct})
  } catch(error) {
    next(error)
  }
}

exports.archiveProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ where: { id, isDeleted: false } });
    if(!product) return res.status(422).json({ success: false, message: "Unable to get product "})
    product.isDeleted = true;
    product.save();
    res.status(200).json({ success: true, data: product })
  } catch(error) {
    next(error)
  }
}

