import mongoose, { Schema } from "mongoose";

const Schema = mongoose.Schema;

const TravelSchema = new Schema({
  travelId: {
    type: Number,
    required: true,
    unique: true
  },
  employeeUsername: {
    type: String,
    required: true,
    unique: true
  },
  travelDate: {
    type: Date,
    default: Date.now
  },
  startLocation: {
    type: String,
    required: true
  },
  endLocation: {
    type: String,
    required: true
  },
  invoicePhoto: {
    type: String,
    required: true
  },
  invoiceInfo: {
    type: String,
    required: true
  },
  invoiceNote: {
    type: String,
  },
  invoicePrice: {
    type: Number,
    required: true,
  },
  priceEstimate: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: "waiting",
    enum: [
      "waiting",
      "approved",
      "suspecious"
    ]
  },
  approveByAccountant: {
    type: String,
    required: true,
    unique: true,
    default: null,
  },
  approveDate: {
    type: Date,
    default: Date.now
  }
});

const Travel = mongoose.model("travel", TravelSchema);

export default Travel;