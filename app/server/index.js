import express from 'express';
import dotenv from 'dotenv';
import connectToMongoDB from './config/db.js';
import Home from './routes/Home.js';
import Auth from './routes/Auth.js';
import Shipment from './routes/Shipment.js';
import cors from "cors";

dotenv.config();

const app = express();

// CORS should be enabled early and preflights should be handled
const corsOptions = {
    origin: true, // reflect request origin
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// ✅ Middleware to parse incoming JSON requests
app.use(express.json());

const port = process.env.PORT || 5000;

// Connect to the database and then start the server
connectToMongoDB().then(() => {
    app.use('/', Home);
    app.use('/auth', Auth);
    app.use('/shipment', Shipment);

    app.listen(port, () => {
        console.log(`✅ Server running at: http://localhost:${port}/`);
    });
}).catch((error) => {
    app.get('*', (req, res) => {
        res.send("☠️ Server is disconnected!!");
        console.log("Server throwing error : ", error.message);
    })
});