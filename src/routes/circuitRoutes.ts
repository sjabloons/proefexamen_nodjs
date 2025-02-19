import express from "express";

import { getAllCircuit } from "../controllers/circuitController";

const router = express.Router();
router.get("/", getAllCircuit);

export default router;
