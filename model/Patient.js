// models/Patient.js
import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number },
    bloodGroup: { type: String, required: true },
    units: { type: Number, required: true, default: 1 },
    emergency: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);
export default Patient; // use export default
