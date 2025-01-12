import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDatabase from "./database/database";
import userRoutes from "./routes/user.routes";
dotenv.config();

const app: Express = express();
connectToDatabase();
app.use(cors());
// data parse
app.use(express.json()); // receive json data
app.use(express.urlencoded({ extended: true })); // url anchor data

app.get("/", (req: Request, res: Response) => {
	res.send("Express + TypeScript Server");
});
app.use("/users",userRoutes);

// module.exports = app;
export default app;
