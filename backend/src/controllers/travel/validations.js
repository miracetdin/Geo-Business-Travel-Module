import Joi from 'joi';

const TravelSchema = Joi.object({
  // travelId: Joi.number().required(),
  employeeUsername: Joi.string().min(5),
  travelDate: Joi.date().required(),
  startLocation: Joi.string().required(),
  endLocation: Joi.string().required(),
  invoicePhoto: Joi.string().required(),
  invoiceInfo: Joi.string().required(),
  invoiceNote: Joi.string(),
  invoicePrice: Joi.number().required(),
  priceEstimate: Joi.number().required(),
  suspicious: Joi.string().required(),
  status: Joi.string().required(),
  // approveByAccountant: Joi.string().required(),
  // approveDate: Joi.date().required(),
});

export default TravelSchema;
