const express = require("express");
const bodyParser = require("body-parser");

const logger = require("./middleware/log");
const errorHandler = require("./utils/error");
const cars = require("./routes/cars");
const carlocation = require("./routes/carlocation");
const manufacturer = require("./routes/manufacturer");

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "pug");

app.use(logger);

app.use('/cars', cars);
app.use('/carlocation', carlocation);
app.use('/manufacturer', manufacturer);

app.use(errorHandler);

module.exports = app;