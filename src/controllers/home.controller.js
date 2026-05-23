const productService = require("../services/product.service");

function getFeatured(req, res) {
  const featured = productService.listProducts().slice(0, 3);
  res.json({ featured });
}

module.exports = { getFeatured };
