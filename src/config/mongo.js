import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Conexión a MongoDB
export const connDB=async()=>{
    try {
        await mongoose.connect(
            process.env.MONGO_URL,
            {
                dbName: process.env.DB_NAME,
            }
        )
        console.log("DB conectada...!!!")
    } catch (error) {
        console.log(`Error al conectar a DB: ${error}`)
    }
}
