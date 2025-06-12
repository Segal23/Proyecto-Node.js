import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGO_URI; 

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

export const connectDB = async () => {
    try {
        await mongoose.connect(uri, clientOptions);
        console.log('🔌 Conectado a MongoDB Atlas con Stable API v1');
    } catch (error) {
        console.error('❌ Error al conectar con MongoDB:', error.message);
        process.exit(1);
    }
};