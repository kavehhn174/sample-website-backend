const products = [
  {
    id: "1",
    name: "Alpine Daypack",
    price: 89,
    description: "Lightweight 28L pack for day hikes and city carry.",
    imageUrl: "/images/placeholder-pack.svg",
    tags: ["outdoor", "travel", "gear"],
  },
  {
    id: "2",
    name: "Ceramic Pour-Over Set",
    price: 42,
    description: "Dripper, server, and filters for slow mornings.",
    imageUrl: "/images/placeholder-coffee.svg",
    tags: ["kitchen", "coffee", "gift"],
  },
  {
    id: "3",
    name: "Merino Crew Sweater",
    price: 120,
    description: "Soft merino wool, regular fit, three-season comfort.",
    imageUrl: "/images/placeholder-sweater.svg",
    tags: ["apparel", "wool", "comfort"],
  },
];

function listProducts() {
  return [...products];
}

function getProductById(id) {
  return products.find((p) => p.id === String(id)) ?? null;
}

function addProduct(product) {
  products.push(product);
  return product;
}

function nextId() {
  const max = products.reduce((m, p) => Math.max(m, Number(p.id) || 0), 0);
  return String(max + 1);
}

module.exports = {
  listProducts,
  getProductById,
  addProduct,
  nextId,
};
