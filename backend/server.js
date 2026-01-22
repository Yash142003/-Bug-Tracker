import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// routes
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import userRoutes from "./routes/userRoutes.js"; // ✅ if you created users route

dotenv.config();

// ✅ connect DB first
connectDB();

// ✅ create app BEFORE using it
const app = express();

// ✅ middleware
app.use(cors());
app.use(express.json());

// ✅ test route
app.get("/", (req, res) => {
  res.send("Bug Tracker API Running ✅");
});

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes); // ✅ for project members API

// ✅ start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
