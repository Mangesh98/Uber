import mongoose from "mongoose";

async function connectToDatabase() {
	try {
		await mongoose.connect(process.env.MONGODB_URI!);
		console.log("[server]: Database connected successfully!");
	} catch (error: unknown) {
		console.log(`[server]: Failed to connect to database: ${error}`);
	}
}

export default connectToDatabase;
