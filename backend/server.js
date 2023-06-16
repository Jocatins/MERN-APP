import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
const port = process.env.PORT || 8700;
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
// import DB connection
import connectDB from "./config/db.js";

connectDB();

const app = express();

app.use(express.json()); //
app.use(express.urlencoded({ extended: true })); // it helps us send form data

// cookie Parser
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.get("/", (req, res) => res.send("Server is ready"));

//  --- Middleware error handlers--------
app.use(notFound);
app.use(errorHandler);
//----------------------------
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
