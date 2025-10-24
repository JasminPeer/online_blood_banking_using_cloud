import mongoose from "mongoose";

const donorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  bloodGroup: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  donations: { type: Number, default: 0 },
  lastDonation: { type: Date, default: Date.now },
}, { timestamps: true });

donorSchema.virtual("isExpired").get(function () {
  const oneYear = 1000 * 60 * 60 * 24 * 365;
  const lastDonationTime = new Date(this.lastDonation).getTime();
  const now = Date.now();
  return this.donations >= 5 || now - lastDonationTime > oneYear;
});

export default mongoose.model("Donor", donorSchema);
