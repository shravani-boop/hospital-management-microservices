const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


const PORT = 3003;

// MongoDB connection
mongoose.connect("mongodb://mongodb:27017/hospital")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

// Appointment schema
const appointmentSchema = new mongoose.Schema({
    patientId: String,
    doctorId: String,
    date: String,
    time: String,
    status: String
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

// Health check
app.get("/health", (req, res) => {
    res.json({
        service: "appointment-service",
        status: "UP"
    });
});

// Get appointments
app.get("/appointments", async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch appointments" });
    }
});

// Add appointment
app.post("/appointments", async (req, res) => {
    try {
        const appointment = new Appointment(req.body);
        const savedAppointment = await appointment.save();
        res.status(201).json(savedAppointment);
    } catch (error) {
        res.status(500).json({ error: "Failed to add appointment" });
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Appointment service running on port ${PORT}`);
});
