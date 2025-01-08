import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
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

UserSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET as string, {
		expiresIn: "1d",
	});
	return token;
};

UserSchema.methods.comparePassword = function (password: string) {
	return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = async function (password: string) {
	const salt = await bcrypt.genSalt(10);
	return bcrypt.hash(password, salt);
};

// Export the User model
export default mongoose.model("User", UserSchema);
