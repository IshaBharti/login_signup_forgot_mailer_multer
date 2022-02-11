var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var models = require("./model/userModel");



const { check, validationResult } = require("express-validator");


var router = express.Router();

const mongoose = require("mongoose");
var db = require("./connections/db");
const { constants } = require("buffer");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));
app.use("/uploads/images", express.static("uploads/images"))

app.use("/user", require("./routes/user"));
app.use("/admin", require("./routes/admin"));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

module.exports = app;
