import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import products from "./products.js";
import stripeRoute from "./routes/stripe.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const port = process.env.PORT || 8700;

// import DB connection

connectDB();

const app = express();

app.use(express.json()); //
app.use(express.urlencoded({ extended: true })); // it helps us send form data

const allowedOrigins = ["http://localhost:3500"];

const options = {
	origin: allowedOrigins,
	optionsSuccessStatus: 200,
};

app.use(cors(options));

// cookie Parser
app.use(cookieParser());

app.use("/api/users", userRoutes);

app.use("/api/stripe", stripeRoute);

app.get("/products", (req, res) => {
	res.send(products);
});

if (process.env.NODE_ENV === "production") {
	const __dirname = path.resolve();
	app.use(express.static(path.join(__dirname, "frontend/dist")));

	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
	);
} else {
	app.get("/", (req, res) => res.send("Server is ready"));
}

//  --- Middleware error handlers--------
app.use(notFound);
app.use(errorHandler);
//----------------------------
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
