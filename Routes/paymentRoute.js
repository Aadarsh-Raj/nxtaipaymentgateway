const express = require("express");
const paymentController = require("../Controllers/paymentController");

const router = express.Router();
// create payment
router.post("/create", paymentController.createPayment);

// process payment
router.post("/:id/process", paymentController.processPayement);

// get payment status
router.post("/:id", paymentController.getPaymentStatus);

// refund 
router.post("/:id/refund", paymentController.refundPayment);

module.exports = router;