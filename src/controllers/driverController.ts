import { Request, Response } from "express";
import { Driver } from "../models/driverModel";

export const getAllDrivers = async (req: Request, res: Response) => {
    try {
        const { search } = req.query;

        let query: any = {};
        if (search) {
            query.familyName = { $regex: new RegExp(search as string, "i") }; // Case-insensitive search
        }

        const drivers = await Driver.find(query).lean();

        if (drivers.length === 0) {
            return res.status(404).json({ message: "Geen coureurs gevonden." });
        }

        const enrichedDrivers = drivers.map((driver) => ({
            ...driver,
            flagUrl: `https://purecatamphetamine.github.io/country-flag-icons/3x2/${driver.countryCode.toUpperCase()}.svg`,
        }));

        res.status(200).json(enrichedDrivers);
    } catch (error) {
        console.error("Fout bij ophalen van coureurs:", error);
        res.status(500).json({
            message:
                "Er is een fout opgetreden bij het ophalen van de coureurs.",
        });
    }
};
