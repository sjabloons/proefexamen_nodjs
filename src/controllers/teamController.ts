import { Request, Response } from "express";
import { Team } from "../models/teamModel";

export const getAllTeams = async (req: Request, res: Response) => {
    const team = await Team.find();
    res.status(200).json(team);
};
