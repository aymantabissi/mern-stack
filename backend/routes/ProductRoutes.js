import express from "express";
import upload from '../middlwares/uploads.js';
import { 
  createProduct, 
  getProducts, 
  updateProduct, 
  deleteProduct, 
  deleteAllProducts,
  searchProducts,
  getProductById
} from "../Controller/ProductController.js";

const router = express.Router();

// POST route for creating a product (with image upload)
router.post("/", upload.single("image"), createProduct);

// GET all products
router.get("/", getProducts);

// DELETE all products
router.delete("/", deleteAllProducts);

// GET product by search query
router.get("/search", searchProducts);

// GET product by ID
router.get("/:id", getProductById);

// PUT to update a product by ID
router.put("/:id", updateProduct);

// DELETE product by ID
router.delete("/:id", deleteProduct);

export default router;
