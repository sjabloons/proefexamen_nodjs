import mongoose from "mongoose";

const circuitSchema = new mongoose.Schema({
    circuit_id: { type: String },
    name: { type: String },
    image: { type: String },
    location: {
        country: { type: String },
        city: { type: String },
    },
    length_km: { type: Number },
    turns: { type: Number },
});

export const Circuit = mongoose.model("Circuit", circuitSchema);
