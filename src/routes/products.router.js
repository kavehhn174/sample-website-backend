import express from "express";
import * as productController from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", productController.listProducts);
router.post("/", productController.createProduct);
router.get("/:id", productController.getProduct);

export default router;
