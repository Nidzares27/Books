const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

const errorController = require("./controllers/error");

const path = require("path");

app.set("view engine", "ejs");
app.set("views", "views");

const libaryRoutes = require("./routes/routes");

app.use(libaryRoutes);

app.use(errorController.get404);

app.listen(3000);
