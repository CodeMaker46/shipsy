import express from 'express';
import dotenv from 'dotenv';
import connectToMongoDB from './config/db.js';
import Home from './routes/Home.js';
import Auth from './routes/Auth.js';
import Shipment from './routes/Shipment.js';
import cors from "cors";

dotenv.config();

const app = express();

// CORS must come BEFORE express.json() and routes
const allowedOrigins = [
    process.env.CLIENT_ORIGIN,
    "https://shipsy-33zpsq39j-shikshak-kumars-projects.vercel.app/",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
].filter(Boolean);

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin like mobile apps or curl requests
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());

const port = process.env.PORT || 5001;

// Define routes BEFORE connecting to DB
app.use('/', Home);
app.use('/auth', Auth);
app.use('/shipment', Shipment);

// Connect to MongoDB and then start server
connectToMongoDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running at: http://localhost:${port}/`);
    });
}).catch((error) => {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit if DB connection fails
});