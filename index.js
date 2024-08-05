const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const { authMiddleware } = require("./Middlewares/tokenAuth");
const paymentRoute = require("./Routes/paymentRoute");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const { swaggerSpec } = require("./Middlewares/swaggerSpec");
const userRouter = require("./Routes/userRoute");
const routes = require("./Middlewares/route")
dotenv.config();
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Db connected successfully");
  })
  .catch((e) => {
    console.log(e);
  });
app.use(morgan("dev"));
console.log(JSON.stringify(swaggerSpec, null, 2));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/user", userRouter);
app.use("/api/payment", authMiddleware, paymentRoute);
app.use(( req, res, next) => {
  if (!routes.includes(req.path)) {
    return res.status(404).json({
      error: "Route not found",
      message: "The requested URL was not found on the server.",
    });
  }
  next();
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success:false,
    error: "Internal Server Error",
    message: "An unexpected error occurred. Please try again later.",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
