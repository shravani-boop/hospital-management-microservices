const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3002;

// MongoDB connection
mongoose.connect("mongodb://mongodb:27017/hospital")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

// Doctor schema
const doctorSchema = new mongoose.Schema({
    name: String,
    specialization: String
});

const Doctor = mongoose.model("Doctor", doctorSchema);

// Health check
app.get("/health", (req, res) => {
    res.json({
        service: "doctor-service",
        status: "UP"
    });
});

// Get doctors
app.get("/doctors", async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch doctors" });
    }
});

// Add doctor
app.post("/doctors", async (req, res) => {
    try {
        const doctor = new Doctor(req.body);
        const savedDoctor = await doctor.save();
        res.status(201).json(savedDoctor);
    } catch (error) {
        res.status(500).json({ error: "Failed to add doctor" });
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Doctor service running on port ${PORT}`);
});;
