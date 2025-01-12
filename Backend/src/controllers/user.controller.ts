import { validationResult } from "express-validator";
import userModel, { IUserModel } from "../models/user.model";
import { createUser } from "../services/user.service";
import { User } from "../types/user.type";


export const registerUser = async (req: any, res: any) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const user: User = req.body;

		const hashedPassword = await userModel.hashPassword(user.password);
		user.password = hashedPassword;
		const createdUser = await createUser(user);

		const token = createdUser.generateAuthToken();

		res.status(201).json({ user: createdUser, token });
	} catch (error) {
		console.error("Error in registerUser:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};
