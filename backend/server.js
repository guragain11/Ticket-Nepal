import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

dotenv.config(); // ✅ THIS WAS MISSING

const app = express();
const port = 3000;

await connectDB();

// Middleware
app.use(express.json());
app.use(cors())
app.use(clerkMiddleware())

// api route
app.get('/', (req, res) => res.send("Server is running"))
app.use('/api/inngest',serve({ client: inngest, functions }))

app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`)
);
