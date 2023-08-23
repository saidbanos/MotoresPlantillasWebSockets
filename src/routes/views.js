import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router();
const productManager = new ProductManager("./src/productos.json");

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
