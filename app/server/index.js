import express from 'express';
import dotenv from 'dotenv';
import connectToMongoDB from './config/db.js';
import Auth from './routes/Auth.js';
import Shipment from './routes/Shipment.js';
import cors from "cors"

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Shipsy API Running', version: '1.0' });
});

// Your other routes
app.use('/auth', Auth);
app.use('/shipment', Shipment);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(port, () => {
    console.log(`✅ Server listening on port ${port}`);
    connectToMongoDB()
        .then(() => console.log('✅ MongoDB connected'))
        .catch(err => console.error('❌ MongoDB error:', err.message));
});