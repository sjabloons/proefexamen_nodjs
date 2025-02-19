import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    team_id: { type: String },
    name: { type: String },
    principal: { type: String },
    base: { type: String },
    founded_year: { type: Number },
    engine: { type: String },
    drivers: { type: Array },
    image: { type: String },
});

export const Team = mongoose.model("Team", teamSchema);
