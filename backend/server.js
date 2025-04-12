import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { ConnectDB } from "./config/db.js";
import ProductRoutes from "./routes/ProductRoutes.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import AiRoutes from "./routes/AiRoutes.js"; // ✅ Correct import

// Load environment variables
dotenv.config();

// Fix "__dirname" in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",  // Replace with your frontend URL if different
}));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api", AiRoutes);


// Routes
app.use("/api/products", ProductRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", UserRoutes);
app.use("/api", AuthRoutes);


app.get("/uploads/:image", (req, res) => {
  res.sendFile(path.join(__dirname, "uploads", req.params.image));
});


// Connect to Database and Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    await ConnectDB();
    console.log(`🚀 Server started at: http://localhost:${PORT}`);
});
