const PaymentModel = require("../Models/paymentModel");
const createPayment = async (req, res) => {
  try {
    if (
      !req.user.email ||
      !req.body.amount ||
      !req.body.currency ||
      !req.body.paymentMethod
    ) {
      return res.status(400).json({
        success: false,
        message:
          "userEmail, amount, currency and paymentMethod are required fields",
      });
    }
    const createPaymentObj = {
      userEmail: req.user.email,
      amount: req.body.amount,
      currency: req.body.currency,
      paymentMethod: req.body.paymentMethod,
    };

    const payment = await PaymentModel.create(createPaymentObj);
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not created",
      });
    }
    await payment.save();
    res.status(201).json({
      success: true,
      message: "Payment created successfully",
      result: payment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server down",
    });
  }
};

const processPayement = async (req, res) => {
  try {
    const payment = await PaymentModel.findOne({ paymentId: req.params.id });
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }
    payment.status = "Completed";
    await payment.save();
    res.status(201).json({
      success: true,
      message: "Payment processed",
      result: payment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server down",
    });
  }
};
const getPaymentStatus = async (req, res) => {
  try {
    const payment = await PaymentModel.findOne({ paymentId: req.params.id });
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }
    res.status(201).json({
      success: true,
      message: "Get your payment status",
      result: payment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server down",
    });
  }
};

const refundPayment = async (req, res) => {
  try {
    const payment = await PaymentModel.findOne({ paymentId: req.params.id });
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }
    payment.status = "Refunded";
    await payment.save();
    res.status(201).json({
      success: true,
      message: "Payment refunded",
      result: payment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server down",
    });
  }
};
module.exports = {
  createPayment,
  processPayement,
  getPaymentStatus,
  refundPayment,
};
