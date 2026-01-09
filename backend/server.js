import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";
import authRouths from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());



// Middleware
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);


// Route
app.use("/api/auth", authRouths);
// app.use("/api/resume", resumeRouths);

// ---------------- PRODUCTION FRONTEND SERVE ----------------
if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();

    app.use(express.static(path.join(__dirname, "frontend", "dist")));

    app.get("*", (req, res) => {
        res.sendFile(
            path.join(__dirname, "frontend", "dist", "index.html")
        );
    });
}

// Start Server
app.listen(PORT, () => {
    connectDB();
    console.log("Server running on port: " + PORT);

});




// require("dotenv").config();
// const express = require('express');
// const cors = require("cors");
// const path = require("path");
// const { connectDB } = require("./lib/db");


// const app = express()


// app.use(
//     cors({
//         origin: process.env.CLIENT_URL || "*",
//         methods: ["GET", "POST", "PUT", "DELETE"],
//         allowedHeaders: ["Content-Type", "Authorization"],
//     })
// );

// // Middleware
// app.use(express.json());



// // Start Server
// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
//     connectDB()
// })