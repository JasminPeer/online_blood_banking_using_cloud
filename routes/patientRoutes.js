import express from "express";
import Patient from "../model/Patient.js";

const router = express.Router();

// GET all patients
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: "Error fetching patients", error: err.message });
  }
});

// POST new patient
router.post("/", async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ message: "Error adding patient", error: err.message });
  }
});

// DELETE patient by id
router.delete("/:id", async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ message: "Patient removed" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting patient", error: err.message });
  }
});

export default router;
