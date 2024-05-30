import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors"
import helmet from 'helmet';

import mongoose from "mongoose";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js"
import cartRouter from "./routes/cart.route.js";
import getOverView from "./controllers/overview.js";
import { protectRoute } from "./middleware/protectRoute.js";
const app = express();
dotenv.config();
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors({ origin: "", credentials: true }));
app.use(express.json({ limit: "5mb" })); // to parse req.body
app.use(express.urlencoded({ extended: true })); // to parse form data(urlencoded)

// 


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

// Routes
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});

// MongoDB Connection
try {
    mongoose.connect(process.env.dbUrl);
    console.log("Connected to MongoDB");
} catch (err) {
    console.error("Error connecting to MongoDB:", err);
}
// Sample route


app.get("/hello", (req, res) => {
    return res.status(200).send({ res: "hello" });
});
// Auth routes
app.use('/api/auth', authRoutes);
// products routes
app.use("/api/products", protectRoute, productRoutes);
// cart routes
app.use('/api/cart',protectRoute, cartRouter);
// overviews
app.get('/api/overviews', protectRoute, getOverView);
