// Imports
import "dotenv/config";
import cors from "cors";
import express from "express";
import { notFound } from "./controllers/notFoundController";
import raceRoutes from "./routes/raceRoutes";
import teamRoutes from "./routes/teamRoutes";
import driverRoutes from "./routes/driverRoutes";
import circuitRoutes from "./routes/circuitRoutes";
import mongoose from "mongoose";

// Variables
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/races", raceRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/circuits", circuitRoutes);
app.all("*", notFound);

// Database connection
try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Database connection OK");
} catch (err) {
    console.error(err);
    process.exit(1);
}

// Server Listening
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}! 🚀`);
});
