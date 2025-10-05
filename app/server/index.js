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
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true
}));

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