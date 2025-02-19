import { Request, Response } from "express";
import { Race } from "../models/raceModel";
import { Driver } from "../models/driverModel";

export const getAllRaces = async (req: Request, res: Response) => {
    try {
        const { format } = req.query;
        const shouldFormat = format === "true";

        const races = await Race.find().lean();
        const drivers = await Driver.find().lean();

        const driverMap = new Map(
            drivers.map((driver) => [
                driver.driver_id,
                {
                    ...driver,
                    flagUrl: `https://purecatamphetamine.github.io/country-flag-icons/3x2/${driver.countryCode.toUpperCase()}.svg`,
                },
            ])
        );

        const formatTimeForFirstPosition = (milliseconds: number) => {
            const hours = Math.floor(milliseconds / 3600000);
            const minutes = Math.floor((milliseconds % 3600000) / 60000);
            const seconds = ((milliseconds % 60000) / 1000).toFixed(3);
            return `${hours}:${minutes
                .toString()
                .padStart(2, "0")}:${seconds.padStart(6, "0")}`;
        };

        const formatTimeForOtherPositions = (milliseconds: number) =>
            (milliseconds / 1000).toFixed(3);
        const enrichedRaces = races.map((race) => ({
            ...race,
            race_results: race.race_results.map((result, index) => ({
                ...result,
                time: shouldFormat
                    ? index === 0
                        ? formatTimeForFirstPosition(result.time)
                        : formatTimeForOtherPositions(result.time)
                    : result.time,
                driver: driverMap.get(result.driver_id) || null,
            })),
        }));

        res.status(200).json(enrichedRaces);
    } catch (error) {
        console.error("Fout bij ophalen van races:", error);
        res.status(500).json({
            message: "Er is een fout opgetreden bij het ophalen van de races.",
        });
    }
};
