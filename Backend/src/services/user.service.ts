import userModel from "../models/user.model";
import { User } from "../types/user.type";

export const createUser = async (user: User) => {
	if (!user) throw new Error("Invalid user data");
	return await userModel.create(user);
};
