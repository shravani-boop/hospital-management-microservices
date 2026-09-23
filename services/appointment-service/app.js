const express = require("express");

const app = express();

app.use(express.json());

const PORT = 3003;

// Health check
app.get("/health", (req, res) => {
    res.json({
        service: "appointment-service",
        status: "UP"
    });
});

// Get appointments
app.get("/appointments", (req, res) => {
    res.json([
        {
            id: 1,
            patientId: 1,
            doctorId: 1,
            date: "2026-09-25",
            time: "10:00 AM",
            status: "Scheduled"
        },
        {
            id: 2,
            patientId: 2,
            doctorId: 2,
            date: "2026-09-26",
            time: "02:00 PM",
            status: "Scheduled"
        }
    ]);
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Appointment service running on port ${PORT}`);
});
