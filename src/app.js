import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import viewsRoute from "./routes/views.js";
import { Server } from "socket.io";

import productsRouter from "./routes/products.js";
import cartsRouter from "./routes/carts.js";
import realTimeProductsRoute from "./routes/realTimeProducts.js";
import ProductManager from "./ProductManager.js";
import path from 'path';

const app = express();

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
	next();
});

const port = 8080;
const server = app.listen(port, () => {
	console.log(`Server active on port: ${port}`);
});
const socketServer = new Server(server);

const productsPath = path.join(__dirname, '..', 'src', 'productos.json');

const productManager = new ProductManager(productsPath, socketServer);

app.use("/", viewsRoute);
app.use(
	"/realtimeproducts",
	realTimeProductsRoute({ socketServer, productManager })
);

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).send("Something went wrong on app.js");
});

const logs = [];
socketServer.on("connection", (socket) => {
	console.log("Nuevo cliente conectado");

	socket.on("message1", (data) => {
		socketServer.emit("log", data);
	});

	socket.on("message2", (data) => {
		logs.push({ socketId: socket.id, message: data });
		socketServer.emit("log", { logs });
	});

	socket.on("deleteProduct", async (productId) => {
		const result = await productManager.deleteProduct(productId);
		const updatedProducts = await productManager.getProducts();
		socketServer.emit("productUpdate", updatedProducts);
	});

	socket.on("addProduct", async (productData) => {

		const { title, description, price, thumbnails, code, stock, category } =
			productData;
		const result = await productManager.addProduct(
			title,
			description,
			price,
			thumbnails,
			code,
			stock,
			category
		);

		const updatedProducts = await productManager.getProducts();
		socketServer.emit("productUpdate", updatedProducts);
	});
});
