const express = require("express");

const app = express();

app.use(express.json());

const PORT = 3001;

// Health check
app.get("/health", (req, res) => {
    res.json({
        service: "patient-service",
        status: "UP"
    });
});

// Get patients
app.get("/patients", (req, res) => {
    res.json([
        {
            id: 1,
            name: "John Doe",
            age: 35,
            disease: "Diabetes"
        },
        {
            id: 2,
            name: "Jane Smith",
            age: 28,
            disease: "Asthma"
        }
    ]);
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Patient service running on port ${PORT}`);
});
