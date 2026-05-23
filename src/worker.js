import { allowedOrigins } from "./config/cors.js";
import * as productService from "./services/product.service.js";
import { createProductFromBody } from "./services/product.operations.js";

function normalizeOrigin(origin) {
  return origin.replace(/\/$/, "");
}

function buildCorsHeaders(request) {
  const headers = new Headers();
  const origin = request.headers.get("Origin");

  if (origin && allowedOrigins.has(normalizeOrigin(origin))) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Credentials", "true");
  }

  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");
  return headers;
}

function jsonResponse(request, data, status = 200) {
  const headers = buildCorsHeaders(request);
  headers.set("Content-Type", "application/json");
  return new Response(JSON.stringify(data), { status, headers });
}

export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: buildCorsHeaders(request) });
    }

    const url = new URL(request.url);
    const { pathname } = url;

    try {
      if (pathname === "/api/health" && request.method === "GET") {
        return jsonResponse(request, { status: "ok" });
      }

      if (pathname === "/api/featured" && request.method === "GET") {
        const featured = productService.listProducts().slice(0, 3);
        return jsonResponse(request, { featured });
      }

      if (pathname === "/api/products" && request.method === "GET") {
        return jsonResponse(request, { items: productService.listProducts() });
      }

      if (pathname === "/api/products" && request.method === "POST") {
        const body = await request.json();
        const product = createProductFromBody(body);
        return jsonResponse(request, { product }, 201);
      }

      const detailMatch = pathname.match(/^\/api\/products\/([^/]+)$/);
      if (detailMatch && request.method === "GET") {
        const product = productService.getProductById(detailMatch[1]);
        if (!product) {
          return jsonResponse(request, { error: "Product not found" }, 404);
        }
        return jsonResponse(request, { product });
      }

      return jsonResponse(request, { error: "Not found" }, 404);
    } catch {
      return jsonResponse(request, { error: "Internal server error" }, 500);
    }
  },
};
