const express = require("express");
const paymentController = require("../Controllers/paymentController");

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Payment management
 */
/**
 * @swagger
 * /api/payment/create:
 *   post:
 *     summary: Create a new payment
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - currency
 *             properties:
 *               amount:
 *                 type: number
 *               currency:
 *                 type: string
 *     responses:
 *       201:
 *         description: Payment created successfully
 *       400:
 *         description: Bad request
 */
// create payment
router.post("/create", paymentController.createPayment);
/**
 * @swagger
 * /api/payment/{id}/process:
 *   post:
 *     summary: Process a payment
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The payment ID
 *     responses:
 *       200:
 *         description: Payment processed successfully
 *       404:
 *         description: Payment not found
 */
// process payment
router.post("/:id/process", paymentController.processPayement);
/**
 * @swagger
 * /api/payment/{id}/status:
 *   get:
 *     summary: Get payment status
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The payment ID
 *     responses:
 *       200:
 *         description: Payment status retrieved successfully
 *       404:
 *         description: Payment not found
 */
// get payment status
router.get("/:id/status", paymentController.getPaymentStatus);
/**
 * @swagger
 * /api/payment/{id}/refund:
 *   post:
 *     summary: Refund a payment
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The payment ID
 *     responses:
 *       200:
 *         description: Payment refunded successfully
 *       404:
 *         description: Payment not found
 */
// refund 
router.post("/:id/refund", paymentController.refundPayment);

module.exports = router;