const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const paymentSchema = new mongoose.Schema(
  {
    paymentId: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    userEmail: {
      type: String,
      require: true,
    },
    amount: {
      type: Number,
      require: true,
    },
    currency: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
    paymentMethod:{
        type:String,
        require:true
    }
  },
  {
    timestamps: true,
  }
);

const PaymentModel = mongoose.model("payments", paymentSchema);
module.exports = PaymentModel;
