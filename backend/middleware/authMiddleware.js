// parse the cookie | protecting the routes
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// to protect routes to users should be logged in before accessing this route
const protect = asyncHandler(async (req, res, next) => {
	let token;

	token = req.cookies.jwt;

	if (token) {
		try {
			// this decoded object will have the user id
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			req.user = await User.findById(decoded.userId).select("-password"); // select("-password") makes the hashed password not to return
			next();
		} catch (error) {
			res.status(401);
			throw new Error("Not Authorized, invalid token");
		}
	} else {
		res.status(401);
		throw new Error("Not authorized, no token");
	}
});

export { protect };
