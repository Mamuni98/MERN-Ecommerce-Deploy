const model = require("../model/product");
const Product = model.Product;

//READ
exports.getAllProducts = async (req, res) => {
  let query = Product.find();
  const pageSize = 3;
  const page = req.query.page;
  if (req.query.sort) {
    const products = await query.sort({[req.query.sort]:req.query.order}).skip(pageSize*(page-1)).limit(pageSize).exec();
    res.json(products);
  } else {
    const products = await query.exec();
    res.json(products);
  }

  //const products = await Product.find({price:{$gt:600}});
};

exports.getProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  res.json(product);
};

//CREAT
exports.createProduct = (req, res) => {
  const product = new Product(req.body);

  product
    .save()
    .then((doc) => {
      console.log({ doc });
      res.status(201).json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

//UPDATE
exports.replaceProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndReplace({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

//DELETE
exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndDelete({ _id: id }); //doc is the deleted document
    res.status(200).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
