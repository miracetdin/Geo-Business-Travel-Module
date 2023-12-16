import Travel from "../../models/product";
import Boom from "boom";
import TravelSchema from "./validations";

const Create = async (req, res, next) => {
	const input = req.body;
	const { error } = TravelSchema.validate(input);

	if (error) {
		return next(Boom.badRequest(error.details[0].message));
	}

	try {
		input.photo = JSON.parse(input.photo);

		const travel = new Travel(input);
		const savedData = await travel.save();

		res.json(savedData);
	} catch (e) {
		next(e);
	}
};

const Get = async (req, res, next) => {
	const { travel_id } = req.params;

	if (!travel_id) {
		return next(Boom.badRequest("Missing parameter (:travel_id)"));
	}

	try {
		const travel = await Travel.findById(travel_id);

		res.json(travel);
	} catch (e) {
		next(e);
	}
};

const Update = async (req, res, next) => {
	const { travel_id } = req.params;

	try {
		const updated = await Travel.findByIdAndUpdate(travel_id, req.body, {
			new: true,
		});

		res.json(updated);
	} catch (e) {
		next(e);
	}
};

const Delete = async (req, res, next) => {
	const { travel_id } = req.params;

	try {
		const deleted = await Travel.findByIdAndDelete(travel_id);

		if (!deleted) {
			throw Boom.badRequest("Product not found.");
		}

		res.json(deleted);
	} catch (e) {
		next(e);
	}
};

const limit = 10;
const GetList = async (req, res, next) => {
	let { page } = req.query;

	if (page < 1) {
		page = 1;
	}

	const skip = (parseInt(page) - 1) * limit;

	try {
		const travels = await Travel.find({})
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit);

		res.json(travels);
	} catch (e) {
		next(e);
	}
};

export default {
	Create,
	Get,
	Update,
	Delete,
	GetList,
};
