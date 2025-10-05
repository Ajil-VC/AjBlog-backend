import { config } from "./config"
import mongoose from 'mongoose';
const connectDB = async (): Promise<void> => {

    try {

        if (!config.MONGODB_URI) {
            throw new Error('MongoDB URL Not defined.');
        }

        await mongoose.connect(config.MONGODB_URI);
        console.log('MongoDb Connected sucessfully.');

    } catch (err: any) {

        throw new Error('MongoDB connection failed.');
    }

}

export default connectDB;