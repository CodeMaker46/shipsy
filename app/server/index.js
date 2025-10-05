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
// Note: When credentials are enabled, origin cannot be '*'.
const allowedOrigins = [
    'https://shipsy-five.vercel.app',
    'http://localhost:5173',
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow non-browser requests (no origin) and known origins
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
}));

// Explicitly enable preflight across routes (cors middleware will handle response)
app.options('*', cors());

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