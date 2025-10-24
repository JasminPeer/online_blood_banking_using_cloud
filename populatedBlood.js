// populateBlood.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Blood from "./model/Blood.js"; // Make sure this path is correct

dotenv.config(); // Load environment variables from .env

// Blood data to populate
const bloodData = [
  { bloodGroup: "A+", units: 10, expiryDays: 30 },
  { bloodGroup: "A-", units: 5, expiryDays: 30 },
  { bloodGroup: "B+", units: 8, expiryDays: 30 },
  { bloodGroup: "B-", units: 4, expiryDays: 30 },
  { bloodGroup: "AB+", units: 6, expiryDays: 30 },
  { bloodGroup: "AB-", units: 3, expiryDays: 30 },
  { bloodGroup: "O+", units: 12, expiryDays: 30 },
  { bloodGroup: "O-", units: 5, expiryDays: 30 },
];

const populateBlood = async () => {
  try {
    // Connect to MongoDB Atlas using cloud URI from .env
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");

    // Optional: clear existing blood stock before populating
    await Blood.deleteMany({});
    console.log("Existing blood stock cleared");

    // Insert new blood data
    const inserted = await Blood.insertMany(bloodData);
    console.log("Blood stock populated successfully:", inserted);

    // Disconnect after operation
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  } catch (err) {
    console.error("Error populating blood stock:", err);
    process.exit(1); // Exit with failure
  }
};

// Execute the function
populateBlood();
