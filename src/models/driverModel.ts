import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
    driver_id: { type: String },
    permanentNumber: { type: String },
    code: { type: String },
    countryCode: { type: String },
    url: { type: String },
    givenName: { type: String },
    familyName: { type: String },
    dateOfBirth: { type: String },
    nationality: { type: String },
    image: { type: String },
});

export const Driver = mongoose.model("Driver", driverSchema);
