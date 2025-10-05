import express from 'express';
import dotenv from 'dotenv';
import connectToMongoDB from './config/db.js';
import Home from './routes/Home.js';
import Auth from './routes/Auth.js';
import Shipment from './routes/Shipment.js';
import cors from "cors";

dotenv.config();

const app = express();

// Basic request/response debug logger
app.use((req, res, next) => {
    const startTimeMs = Date.now();
    const requestOrigin = req.headers.origin || "";
    const requestContentType = req.headers["content-type"] || "";
    console.log(`[REQ] ${req.method} ${req.originalUrl} | origin=${requestOrigin} | content-type=${requestContentType}`);
    res.on('finish', () => {
        const allowOrigin = res.get('Access-Control-Allow-Origin') || '';
        const durationMs = Date.now() - startTimeMs;
        console.log(`[RES] ${req.method} ${req.originalUrl} -> ${res.statusCode} | A-C-A-Origin=${allowOrigin} | ${durationMs}ms`);
    });
    next();
});

// CORS should be enabled early and preflights should be handled
const corsOptions = {
    origin: true, // reflect request origin
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.options("*", (req, res, next) => {
    // Preflight debug
    console.log('[PRE-FLIGHT] OPTIONS', req.originalUrl, {
        origin: req.headers.origin,
        reqMethod: req.headers['access-control-request-method'],
        reqHeaders: req.headers['access-control-request-headers'],
    });
    return cors(corsOptions)(req, res, next);
});

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