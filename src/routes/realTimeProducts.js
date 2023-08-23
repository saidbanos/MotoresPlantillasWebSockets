import { Router } from "express";

const realTimeProductsRoute = ({ socketServer, productManager }) => {
	const router = Router();

	router.get("/", async (req, res) => {
		let products = await productManager.getProducts();
		res.render("realTimeProducts", { products: products });
	});

	return router;
};

export default realTimeProductsRoute;
