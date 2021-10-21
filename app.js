const express = require("express");
const ExpressError = require("./expressError");
const morgan = require("morgan");
const app = express();

//request body to json

app.use(express.json());
app.use(morgan("dev"));


app.get("/favicon.ico", (req, res) => res.sendStatus(204));

app.use(function (req, res, next) {
  const error = new ExpressError("Not Found", 404);

  return next(error);
});

app.use(function (error, req, res, next) {
  res.status(error.status || 500);

  return res.json({
    error: error,
    message: error.message,
  });
});

module.exports = app;