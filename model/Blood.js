// models/Blood.js
import mongoose from "mongoose";

const bloodSchema = new mongoose.Schema(
  {
    bloodGroup: { type: String, required: true, unique: true },
    units: { type: Number, required: true, default: 0 },
    expiryDays: { type: Number, required: true, default: 30 }, // days until expiry
  },
  { timestamps: true }
);

const Blood = mongoose.model("Blood", bloodSchema);
export default Blood;
