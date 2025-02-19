import express from "express";

import { getAllRaces } from "../controllers/raceController";

const router = express.Router();
router.get("/", getAllRaces);

export default router;
