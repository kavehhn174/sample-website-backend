const path = require("path");
const express = require("express");
const cors = require("cors");

const { corsOptions } = require("./config/cors");
const indexRouter = require("./routes/index.router");
const productsRouter = require("./routes/products.router");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors(corsOptions()));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", indexRouter);
app.use("/api/products", productsRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
