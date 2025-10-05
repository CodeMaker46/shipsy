import express from 'express';
import dotenv from 'dotenv';
import connectToMongoDB from './config/db.js';
import Home from './routes/Home.js';
import Auth from './routes/Auth.js';
import Shipment from './routes/Shipment.js';
import cors from 'cors';

dotenv.config();

const app = express();

const allowedOrigins = [
  'https://shipsy-five.vercel.app',
  'http://localhost:5173'
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true
  })
);

app.options('*', cors());
app.use(express.json());

app.use('/', Home);
app.use('/auth', Auth);
app.use('/shipment', Shipment);

const port = process.env.PORT || 5001;

connectToMongoDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  });