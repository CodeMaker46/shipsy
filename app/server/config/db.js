import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongodb_url = process.env.MONGODB_URL;

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(mongodb_url);
        console.log('Connection to database established!!');
    } catch (error) {
        console.error('Could not connect to the database:', error.message);
        process.exit(1);
    }
}

export default connectToMongoDB;