import express from "express";
import { getProducts, createProduct, updateProduct, deleteProduct, getSalesData, 
    getSeries1,
    getSeries2,
    getSeries3 } from "../controllers/product.controller.js";
//new added  getSalesData for dashboard
const router = express.Router();

router.get("/", getProducts);

router.get("/series1", getSeries1);

router.get("/series2", getSeries2);

router.get("/series3", getSeries3);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

router.get('/sales', getSalesData);


export default router;