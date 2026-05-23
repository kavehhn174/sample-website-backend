import * as productService from "../services/product.service.js";
import { createProductFromBody } from "../services/product.operations.js";

export function listProducts(req, res) {
  res.json({ items: productService.listProducts() });
}

export function getProduct(req, res) {
  const product = productService.getProductById(req.params.id);
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  res.json({ product });
}

export function createProduct(req, res) {
  const product = createProductFromBody(req.body);
  res.status(201).json({ product });
}
