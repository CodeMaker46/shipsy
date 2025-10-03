import express from 'express';
import dotenv from 'dotenv';
import connectToMongoDB from './config/db.js';
import Auth from './routes/Auth.js';
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

const port = process.env.PORT || 5001;

connectToMongoDB().then(() => {
    app.use('/auth', Auth);

    app.listen(port, () => {
        console.log(`Server running at: http://localhost:${port}`);
    });
}).catch((error) => {
    app.get('*', (req, res) => {
        res.send(" Server is disconnected!!");
        console.log("Server throwing error : ", error.message);
    })
});