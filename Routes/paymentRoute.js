const express = require("express");
const paymentController = require("../Controllers/paymentController");

const router = express.Router();
// create payment
router.post("/create", paymentController.createPayment);

// process payment
router.post("/:id/process", paymentController.processPayement);

// get payment status
router.get("/:id/status", paymentController.getPaymentStatus);

// refund 
router.post("/:id/refund", paymentController.refundPayment);

module.exports = router;