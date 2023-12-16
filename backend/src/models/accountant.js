import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const AccountantSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
		toJSON: false,
	},
	// role: {
	// 	type: String,
	// 	default: "user",
	// 	enum: ["user", "admin"],
	// },
});

AccountantSchema.pre("save", async function (next) {
	try {
		if (this.isNew) {
			const salt = await bcrypt.genSalt(10);
			const hashed = await bcrypt.hash(this.password, salt);
			this.password = hashed;
		}

		next();
	} catch (e) {
		next(error);
	}
});

AccountantSchema.methods.isValidPass = async function (pass) {
	return await bcrypt.compare(pass, this.password);
};

const Accountant = mongoose.model("accountant", AccountantSchema);

export default Accountant;
