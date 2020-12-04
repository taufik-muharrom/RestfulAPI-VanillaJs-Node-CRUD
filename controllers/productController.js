const Product = require("../models/productModel");
const { getPostData } = require("../utils");

// @desc Gets All Products
// @route GET /api/products
async function getProducts(req, res) {
  try {
    const products = await Product.findAll();
    res
      .writeHead(200, { "Content-Type": "application/json" })
      .end(JSON.stringify(products));
  } catch (e) {
    console.log(e);
  }
}

// @desc Gets Single Products
// @route GET /api/product/:id
async function getProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res
        .writeHead(404, { "Content-Type": "application/json" })
        .end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      res
        .writeHead(200, { "Content-Type": "application/json" })
        .end(JSON.stringify(product));
    }
  } catch (e) {
    console.log(e);
  }
}

// @desc Create a Product
// @route POST /api/products
async function createProduct(req, res) {
  try {
    const body = await getPostData(req);
    const { name, email, description } = JSON.parse(body);

    const product = {
      name,
      email,
      description,
    };

    const newProduct = await Product.create(product);
    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newProduct));
  } catch (e) {
    console.log(e);
  }
}

// @desc Update a Product
// @route PUT /api/product/:id

async function updateProduct(req, res, id) {
  try {
    const product = await Product.findById(id);
    if (!product) {
      res
        .writeHead(404, { "Content-Type": "application/json" })
        .end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      const body = await getPostData(req);
      const { name, email, description } = JSON.parse(body);
      const productData = {
        name,
        email,
        description,
      };

      const updProduct = await Product.update(id, productData);
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(updProduct));
    }
  } catch (e) {
    console.log(e);
  }
}

// @desc Delete product by id
// @route DELETE /api/product/:id
async function deleteProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res
        .writeHead(404, { "Content-Type": "application/json" })
        .end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      await Product.remove(id);
      res
        .writeHead(200, { "Content-Type": "application/json" })
        .end(JSON.stringify({ message: `Product ${id} removed` }));
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
