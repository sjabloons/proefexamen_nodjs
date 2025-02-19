import { Request, Response } from "express";
import { Circuit } from "../models/circuitModels";

export const getAllCircuit = async (req: Request, res: Response) => {
    try {
        const { circuit } = req.query;
        console.log(circuit);
        if (!circuit) {
            const place = await Circuit.find();
            res.status(200).json(place);
        } else {
            const filteredCircuits = await Circuit.find({
                $or: [
                    {
                        "location.country": {
                            $regex: new RegExp(circuit as string, "i"),
                        },
                    },
                    {
                        "location.city": {
                            $regex: new RegExp(circuit as string, "i"),
                        },
                    },
                ],
            }).lean();

            res.status(200).json(filteredCircuits);
        }
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};
