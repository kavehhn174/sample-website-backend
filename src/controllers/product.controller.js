const productService = require("../services/product.service");

function listProducts(req, res) {
  res.json({ items: productService.listProducts() });
}

function getProduct(req, res) {
  const product = productService.getProductById(req.params.id);
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  res.json({ product });
}

function createProduct(req, res) {
  const { name, price, description, tags } = req.body;

  const tagList = Array.isArray(tags) ? tags : tags ? [tags] : [];
  const normalizedTags = tagList
    .map((t) => String(t ?? "").trim().toLowerCase())
    .filter(Boolean);

  const id = productService.nextId();
  const numericPrice = Number(price);
  const product = {
    id,
    name: String(name ?? "").trim(),
    price: Number.isFinite(numericPrice) ? numericPrice : 0,
    description: String(description ?? "").trim(),
    imageUrl: "/images/placeholder-generic.svg",
    tags: normalizedTags,
  };

  productService.addProduct(product);
  res.status(201).json({ product });
}

module.exports = {
  listProducts,
  getProduct,
  createProduct,
};
