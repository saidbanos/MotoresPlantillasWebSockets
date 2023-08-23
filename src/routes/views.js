import { Router } from "express";
import ProductManager from "../ProductManager.js";
import path from 'path';
import __dirname from "../utils.js";

const router = Router();

const productsPath = path.join(__dirname, '..', 'src', 'productos.json');

const productManager = new ProductManager(productsPath);

router.get("/", async (req, res) => {
	try {
		const products = await productManager.getProducts();
		res.render("index", { products });
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal server error");
	}
});

export default router;
