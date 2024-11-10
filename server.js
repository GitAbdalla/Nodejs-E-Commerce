const path = require('path')

const cors = require('cors')
const compression = require('compression')
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");

dotenv.config({ path: "config.env" });
const ApiError = require("./utils/apiError");
const dbConnection = require("./config/database");
const globalError = require("./middlewares/errorMiddleware");


// Routes
const mountRoutes = require('./routes')

// connect with db
dbConnection();

//express app
const app = express();

app.use(cors())
app.options('*', cors())

app.use(compression())

//Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname,'uploads')))

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Routes
mountRoutes(app)

app.use("*", (req, res, next) => {
  next(new ApiError(`Cant find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware for express
app.use(globalError);

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`App is Running on ${PORT}`);
});

// Handling rejections outside express
process.on("unhandledRejection", (err) => {
  console.log(`unhandledRejection : ${err.name} | ${err.messaage}`);
  server.close(() => {
    console.error("Shutting down...");
    process.exit(1);
  });
});
