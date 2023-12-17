import express from "express";
const router = express.Router();

import Travel from "../controllers/travel";
// import cache from '../cache';

// import grantAccess from "../middlewares/grantAccess";
import { verifyAccessToken } from "../helpers/jwt";

router.post(
	"/",
	verifyAccessToken,
	// grantAccess("createAny", "product"),
	Travel.Create
);
router.get(
	"/:travel_id",
	// verifyAccessToken,
	// grantAccess('readAny', 'product'),
	// cache.route(),
	Travel.Get
);
// router.get('/', cache.route(), Product.GetList);
router.get("/", Travel.GetList);
router.put("/:travel_id", Travel.Update);
router.delete("/:travel_id", Travel.Delete);

export default router;
