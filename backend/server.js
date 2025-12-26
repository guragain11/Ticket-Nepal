import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import User from "./models/User.js";

dotenv.config();

const app = express();
const port = 3000;

// DB
await connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// Test server
app.get("/", (req, res) => {
  res.send("Server is running");
});

// 🔹 TEST: get all users from MongoDB
app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// 🔹 TEST: get logged-in user from MongoDB
app.get("/api/users/me", requireAuth(), async (req, res) => {
  const userId = req.auth.userId;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found in DB" });
  }

  res.json(user);
});

// Inngest
app.use("/api/inngest", serve({ client: inngest, functions }));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
