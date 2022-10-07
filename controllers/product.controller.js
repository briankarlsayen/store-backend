const { Product } = require('../models')
const { checkingValidation } = require('../utilities/formChecker')

const reconstructData = (data) => {
  const arr = Array.isArray(data) ? data.map(item => {
    return {
      ...item.dataValues,
      rate: undefined,
      count: undefined,
      uuid: undefined,
      isDeleted: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      rating: {
        rate: item.dataValues.rate,
        count: item.dataValues.count,
      }
    }
  }): null;

  return Array.isArray(data) ? arr : {
    ...data.dataValues,
    rate: undefined,
    count: undefined,
    uuid: undefined,
    isDeleted: undefined,
    createdAt: undefined,
    updatedAt: undefined,
    rating: {
      rate: data.dataValues.rate,
      count: data.dataValues.count,
    }
  }
}

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
    // res.status(200).json({ success: true, data: reconstructData(products) })
    res.status(200).json(reconstructData(products))
  } catch(error) {
    next(error)
  }
}

exports.getSpecificProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ where: { id, isDeleted: false } });
    if(!product) return res.status(422).json({ success: false, message: "Unable to get product "})
    // res.status(200).json({ success: true, data: reconstructData(product) })
    res.status(200).json(reconstructData(product))
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

