import mongoose, { Schema } from "mongoose";

const Schema = mongoose.Schema;

const PlanSchema = new Schema({
  employeeUsername: {
    type: String,
    required: true,
  },
  travelDate: {
    type: String,
    required: true,
    default: Date.now.toString()
  },
  endLocation: {
    type: String,
    required: true
  },
  accountantUsername: {
    type: String,
    required: true,
  },
});

const Plan = mongoose.model("plan", PlanSchema);

export default Plan;