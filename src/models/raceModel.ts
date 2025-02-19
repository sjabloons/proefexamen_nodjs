import mongoose from "mongoose";

const raceSchema = new mongoose.Schema({
    round: { type: Number },
    circuit_id: { type: String },
    date: { type: String },
    sprint_race: { type: Boolean },
    fastest_lap: { type: String },
    race_results: [
        {
            position: Number,
            driver_id: String,
            time: Number,
            points: Number,
        },
    ],
});

export const Race = mongoose.model("Race", raceSchema);
