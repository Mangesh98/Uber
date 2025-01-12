import mongoose from "mongoose";

export type User = {
	_id?: mongoose.Types.ObjectId;
	fullName: {
		firstName: string;
		lastName: string;
	};
	email: string;
	password: string;
	socketId?: string;
};
