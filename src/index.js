const express = require("express");
const path = require("path");
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const app = express();

app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.set('view engine', 'ejs');
//Initializations
require("./database");
require("./config/passport");

//Settings
app.set("port", process.env.PORT || 3000);

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "mysecretapp",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global variables
app.use((req, res, next) => {
  res.locals.successMessage = req.flash("successMessage");
  res.locals.errorMessage = req.flash("errorMessage");
  res.locals.error = req.flash("error");
  res.locals.user = req.user;
  next();
});
//Routes
app.use(require("./routes/index"));
app.use(require("./routes/notes"));
app.use(require("./routes/users"));
//Static Files
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, './public')))
//Read localhost of environment variables and port
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3000;

//Server is listening
app.listen(port, host, () => {
  console.log("Server is running");
});
