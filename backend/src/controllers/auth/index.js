import Boom from "boom";
import Accountant from "../../models/accountant";

// helpers
import {
	signAccessToken,
	signRefreshToken,
	verifyRefreshToken,
} from "../../helpers/jwt";

// validations
import ValidationSchema from "./validations";
import redis from "../../clients/redis";

const Register = async (req, res, next) => {
	const input = req.body;

	const { error } = ValidationSchema.validate(input);

	if (error) {
		return next(Boom.badRequest(error.details[0].message));
	}

	try {
		const isExists = await Accountant.findOne({ email: input.email });

		if (isExists) {
			return next(Boom.conflict("This e-mail already using."));
		}

		const accountant = new Accountant(input);
		const data = await accountant.save();
		const accountantData = data.toObject();

		delete accountantData.password;
		delete accountantData.__v;

		const accessToken = await signAccessToken({
			accountant_id: accountant._id,
			// role: user.role,
		});
		const refreshToken = await signRefreshToken(accountant._id);

		res.json({
			accountant: accountantData,
			accessToken,
			refreshToken,
		});
	} catch (e) {
		next(e);
	}
};

const Login = async (req, res, next) => {
	const input = req.body;

	const { error } = ValidationSchema.validate(input);

	if (error) {
		return next(Boom.badRequest(error.details[0].message));
	}

	try {
		const accountant = await Accountant.findOne({ email: input.email });

		if (!accountant) {
			throw Boom.notFound("The email address was not found.");
		}

		const isMatched = await accountant.isValidPass(input.password);
		if (!isMatched) {
			throw Boom.unauthorized("email or password not correct");
		}

		const accessToken = await signAccessToken({
			accountant_id: accountant._id,
			// role: user.role,
		});
		const refreshToken = await signRefreshToken(accountant._id);

		const accountantData = accountant.toObject();
		delete accountantData.password;
		delete accountantData.__v;

		res.json({ accountant: accountantData, accessToken, refreshToken });
	} catch (e) {
		return next(e);
	}
};

const RefreshToken = async (req, res, next) => {
	const { refresh_token } = req.body;

	try {
		if (!refresh_token) {
			throw Boom.badRequest();
		}

		const accountant_id = await verifyRefreshToken(refresh_token);
		const accessToken = await signAccessToken(accountant_id);
		const refreshToken = await signRefreshToken(accountant_id);

		res.json({ accessToken, refreshToken });
	} catch (e) {
		next(e);
	}
};

const Logout = async (req, res, next) => {
	try {
		const { refresh_token } = req.body;
		if (!refresh_token) {
			throw Boom.badRequest();
		}

		const accountant_id = await verifyRefreshToken(refresh_token);
		const data = await redis.del(accountant_id);

		if (!data) {
			throw Boom.badRequest();
		}

		res.json({ message: "success" });
	} catch (e) {
		console.log(e);
		return next(e);
	}
};

const Me = async (req, res, next) => {
	const { accountant_id } = req.payload;

	try {
		const user = await Accountant.findById(accountant_id).select("-password -__v");

		res.json(user);
	} catch (e) {
		next(e);
	}
};

export default {
	Register,
	Login,
	RefreshToken,
	Logout,
	Me,
};
