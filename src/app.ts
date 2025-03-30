import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import authRoutes from "./routes/auth.routes";
import queryRoutes from "./routes/query.routes";

app.use("/api/v1", authRoutes);
app.use("/api/v1", queryRoutes);

export default app;