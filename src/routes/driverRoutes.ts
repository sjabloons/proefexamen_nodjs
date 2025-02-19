import express from "express";

import { getAllDrivers } from "../controllers/driverController";

const router = express.Router();
router.get("/", getAllDrivers);

export default router;
