import mongoose from "mongoose"

export const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to database",connectionInstance.connection.host);
    } catch (error) {
        console.error("Error connecting to database",error);
        process.exit(1);
    }
}