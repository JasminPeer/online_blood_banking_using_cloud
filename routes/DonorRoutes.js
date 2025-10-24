import express from "express";
import Donor from "../model/donors.js";

const router = express.Router();

// Register donor
router.post("/", async (req, res) => {
  try {
    console.log("Incoming donor:", req.body); // debug
    const donor = new Donor(req.body);
    await donor.save();
    res.status(201).json(donor);
  } catch (err) {
    console.error("Donor save error:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// Get all donors (filter expired)
router.get("/", async (req, res) => {
  try {
    const donors = await Donor.find();
    const activeDonors = donors.filter(d => !d.isExpired);
    res.json(activeDonors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
