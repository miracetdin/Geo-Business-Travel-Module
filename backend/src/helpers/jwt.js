import JWT from "jsonwebtoken";
import Boom from "boom";

import redis from "../clients/redis";

const signAccessToken = (data) => {
	return new Promise((resolve, reject) => {
		const payload = {
			...data,
		};

		const options = {
			expiresIn: "10d",
			issuer: "geo-business-travel-module.app",
		};

		JWT.sign(payload, process.env.JWT_SECRET, options, (err, token) => {
			if (err) {
				console.log(err);
				reject(Boom.internal());
			}

			resolve(token);
		});
	});
};

const verifyAccessToken = (req, res, next) => {
	const authorizationToken = req.headers["authorization"];
	if (!authorizationToken) {
		next(Boom.unauthorized());
	}

	JWT.verify(authorizationToken, process.env.JWT_SECRET, (err, payload) => {
		if (err) {
			return next(
				Boom.unauthorized(
					err.name === "JsonWebTokenError" ? "Unauthorized" : err.message
				)
			);
		}

		req.payload = payload;
		next();
	});
};

const signRefreshToken = (accountant_id) => {
	return new Promise((resolve, reject) => {
		const payload = {
			accountant_id,
		};
		const options = {
			expiresIn: "180d",
			issuer: "geo-business-travel-module.app",
		};

		JWT.sign(payload, process.env.JWT_REFRESH_SECRET, options, (err, token) => {
			if (err) {
				console.log(err);
				reject(Boom.internal());
			}

			redis.set(accountant_id, token, "EX", 180 * 24 * 60 * 60);

			resolve(token);
		});
	});
};

const verifyRefreshToken = async (refresh_token) => {
	return new Promise(async (resolve, reject) => {
		JWT.verify(
			refresh_token,
			process.env.JWT_REFRESH_SECRET,
			async (err, payload) => {
				if (err) {
					return reject(Boom.unauthorized());
				}

				const { accountant_id } = payload;
				const accountant_token = await redis.get(accountant_id);

				if (!accountant_token) {
					return reject(Boom.unauthorized());
				}

				if (refresh_token === accountant_token) {
					return resolve(accountant_id);
				}
			}
		);
	});
};

export {
	signAccessToken,
	verifyAccessToken,
	signRefreshToken,
	verifyRefreshToken,
};