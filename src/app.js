import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import cors from "cors";
import { corsOptions } from "./config/cors.js";
import indexRouter from "./routes/index.router.js";
import productsRouter from "./routes/products.router.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function createApp({ serveStatic = false } = {}) {
  const app = express();

  app.use(cors(corsOptions()));
  app.use(express.json());

  if (serveStatic) {
    app.use(express.static(path.join(__dirname, "..", "public")));
  }

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api", indexRouter);
  app.use("/api/products", productsRouter);

  app.use((_req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  return app;
}
