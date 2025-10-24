// routes/BloodRoutes.js
import express from "express";
import Blood from "../model/Blood.js";

const router = express.Router();

// GET /api/blood - fetch all blood stock
router.get("/", async (req, res) => {
  try {
    const bloodStock = await Blood.find().sort({ bloodGroup: 1 }); // sort by blood group
    res.json(bloodStock);
  } catch (err) {
    console.error("Error fetching blood stock:", err);
    res.status(500).json({ message: "Server error fetching blood stock" });
  }
});

// POST /api/blood - add/update blood stock (admin)
router.post("/", async (req, res) => {
  try {
    const { bloodGroup, units, expiryDays } = req.body;
    let blood = await Blood.findOne({ bloodGroup });

    if (blood) {
      // Update existing
      blood.units = units;
      blood.expiryDays = expiryDays;
    } else {
      // Create new
      blood = new Blood({ bloodGroup, units, expiryDays });
    }

    await blood.save();
    res.status(201).json(blood);
  } catch (err) {
    console.error("Error saving blood stock:", err);
    res.status(500).json({ message: "Server error saving blood stock" });
  }
});

export default router;
