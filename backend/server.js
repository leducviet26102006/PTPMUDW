const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectDB } = require("./config/database");

const app = express();

app.use(cors());
app.use(express.json());

// Kiem tra server
app.get("/", (req, res) => {
    res.json({
        message: "Backend Quan Ly Toa Nha dang hoat dong!"
    });
});

// Kiem tra ket noi database
app.get("/api/test-db", async (req, res) => {
    try {
        const pool = await connectDB();

        const result = await pool.request().query(`
            SELECT DB_NAME() AS DatabaseName
        `);

        res.json({
            success: true,
            message: "Ket noi database thanh cong!",
            database: result.recordset[0].DatabaseName
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Khoi dong server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server dang chay tai http://localhost:${PORT}`);
});