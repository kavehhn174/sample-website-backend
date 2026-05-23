import * as productService from "../services/product.service.js";

export function getFeatured(req, res) {
  const featured = productService.listProducts().slice(0, 3);
  res.json({ featured });
}
