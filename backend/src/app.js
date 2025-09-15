import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import cors from "cors";

import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);

// Socket.io
connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: "40kb", extended: true }));

// Routes
app.use("/api/v1/users", userRoutes);

// MongoDB + Server Start
const start = async () => {
    try {
        const connectionDb = await mongoose.connect(
            "mongodb+srv://aditipatil0201_db_user:aditipatil@cluster0.6irwfrl.mongodb.net/"
        );

        console.log(`MONGO Connected: ${connectionDb.connection.host}`);

        server.listen(app.get("port"), () => {
            console.log(`LISTENING ON PORT ${app.get("port")}`);
        });
    } catch (err) {
        console.error("Error connecting to MongoDB", err);
    }
};

start();
