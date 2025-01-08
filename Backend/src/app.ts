import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDatabase from "./database/database";

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

// module.exports = app;
export default app;
