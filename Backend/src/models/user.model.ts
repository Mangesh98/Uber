// import mongoose from "mongoose";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// const UserSchema = new mongoose.Schema({
// 	fullName: {
// 		firstName: {
// 			type: String,
// 			required: true,
// 			minlength: [3, "First name must be at least 3 characters long"],
// 		},
// 		lastName: {
// 			type: String,
// 			required: true,
// 			minlength: [3, "Last name must be at least 3 characters long"],
// 		},
// 	},
// 	email: {
// 		type: String,
// 		required: true,
// 		unique: true,
// 		validate: {
// 			validator: function (email: string) {
// 				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 				return emailRegex.test(email);
// 			},
// 			message: "Invalid email address",
// 		},
// 	},
// 	password: {
// 		type: String,
// 		required: true,
// 		select: false,
// 	},
// 	socketId: {
// 		type: String,
// 	},
// });

// UserSchema.methods.generateAuthToken = function () {
// 	const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET as string, {
// 		expiresIn: "1d",
// 	});
// 	return token;
// };

// UserSchema.methods.comparePassword = function (password: string) {
// 	return bcrypt.compare(password, this.password);
// };

// UserSchema.statics.hashPassword = async function (password: string) {
// 	const salt = await bcrypt.genSalt(10);
// 	return bcrypt.hash(password, salt);
// };

// // Export the User model
// const userModel = mongoose.model("User", UserSchema);
// export default userModel;

import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Define the interface for the User Document (instance methods)
interface IUser extends Document {
	fullName: {
		firstName: string;
		lastName: string;
	};
	email: string;
	password: string;
	socketId?: string;
	generateAuthToken: () => string;
	comparePassword: (password: string) => Promise<boolean>;
}

// Define the interface for the User Model (static methods)
export interface IUserModel extends Model<IUser> {
	hashPassword: (password: string) => Promise<string>;
}

// Define the User Schema
const UserSchema: Schema<IUser> = new mongoose.Schema({
	fullName: {
		firstName: {
			type: String,
			required: true,
			minlength: [3, "First name must be at least 3 characters long"],
		},
		lastName: {
			type: String,
			required: true,
			minlength: [3, "Last name must be at least 3 characters long"],
		},
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: function (email: string) {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				return emailRegex.test(email);
			},
			message: "Invalid email address",
		},
	},
	password: {
		type: String,
		required: true,
		select: false,
	},
	socketId: {
		type: String,
	},
});

// Instance methods
UserSchema.methods.generateAuthToken = function (): string {
	const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET as string, {
		expiresIn: "1d",
	});
	return token;
};

UserSchema.methods.comparePassword = function (
	password: string
): Promise<boolean> {
	return bcrypt.compare(password, this.password);
};

// Static methods
UserSchema.statics.hashPassword = async function (
	password: string
): Promise<string> {
	const salt = await bcrypt.genSalt(10);
	return bcrypt.hash(password, salt);
};

// Export the User model
const userModel: IUserModel = mongoose.model<IUser, IUserModel>(
	"User",
	UserSchema
);
export default userModel;
