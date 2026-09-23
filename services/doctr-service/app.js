const express = require("express");

const app = express();

app.use(express.json());

const PORT = 3002;

// Health check
app.get("/health", (req, res) => {
    res.json({
        service: "doctor-service",
        status: "UP"
    });
});

// Get doctors
app.get("/doctors", (req, res) => {
    res.json([
        {
            id: 1,
            name: "Dr. Smith",
            specialization: "Cardiologist"
        },
        {
            id: 2,
            name: "Dr. Priya",
            specialization: "Dermatologist"
        }
    ]);
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Doctor service running on port ${PORT}`);
});
