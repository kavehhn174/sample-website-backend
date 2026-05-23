import * as productService from "./product.service.js";

export function createProductFromBody(body) {
  const { name, price, description, tags } = body ?? {};

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
  return product;
}
