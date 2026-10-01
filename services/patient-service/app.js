const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;

// MongoDB connection
mongoose.connect("mongodb://mongodb:27017/hospital")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

// Patient schema
const patientSchema = new mongoose.Schema({
    name: String,
    age: Number,
    disease: String
});

const Patient = mongoose.model("Patient", patientSchema);

// Health check
app.get("/health", (req, res) => {
    res.json({
        service: "patient-service",
        status: "UP"
    });
});

// Get patients
app.get("/patients", async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch patients" });
    }
});

// Add patient
app.post("/patients", async (req, res) => {
    try {
        const patient = new Patient(req.body);
        const savedPatient = await patient.save();
        res.status(201).json(savedPatient);
    } catch (error) {
        res.status(500).json({ error: "Failed to add patient" });
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Patient service running on port ${PORT}`);
});
