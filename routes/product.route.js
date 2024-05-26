import { getAllProducts } from "../controllers/products.controller.js";
import express from "express";
const router = express.Router();
// router.post("/create-product",createProduct)
router.get("/all-products",getAllProducts);
export default router;