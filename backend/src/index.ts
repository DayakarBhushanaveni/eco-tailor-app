import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import mongoose from "mongoose";

import userRoutes from "./routes/user";
import materialRoutes from "./routes/material";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/