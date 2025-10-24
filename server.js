import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import donorRoutes from "./routes/DonorRoutes.js";
import bloodRoutes from "./routes/bloodRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/donors", donorRoutes);
app.use("/api/blood", bloodRoutes);

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Atlas connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
