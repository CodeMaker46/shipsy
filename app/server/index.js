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
// Allowlist can be configured via env: CORS_ALLOWLIST as comma-separated origins
const envAllowlist = (process.env.CORS_ALLOWLIST || "")
    .split(",")
    .map(v => v.trim())
    .filter(Boolean);

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    process.env.VITE_URL, // optional single client URL
    ...envAllowlist,
].filter(Boolean);

function isOriginAllowed(origin) {
    if (!origin) return true; // non-browser or same-origin
    if (allowedOrigins.includes(origin)) return true;
    // Allow any vercel.app subdomain (preview/staging)
    if (origin.endsWith(".vercel.app")) return true;
    return false;
}

const corsOptions = {
    origin: function (origin, callback) {
        if (isOriginAllowed(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS: " + origin));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "Accept",
        "Origin",
    ],
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