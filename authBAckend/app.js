var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var admin = require("firebase-admin");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, } = require('firebase-admin/firestore');
var serviceAccount = require("./secret.json");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var ProtectedRouteRouter = require("./routes/protected/protectedRoute.js");

var app = express(serviceAccount);
const firebaseApp = initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// view engine setup
app.set("firebaseApp", firebaseApp);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


// db Set up

const db = getFirestore();
app.set('fdb',db) ;

app.use(
  cors({
    origin: ["http://landoflearners.com", "http://www.landoflearners.com" , "http://auth.landoflearners.com", "http://www.auth.landoflearners.com"],
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/ProtectedRouteRouter", ProtectedRouteRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
