var express = require("express");
var router = express.Router();
var createError = require("http-errors");

// error handler
const jsonErrorHandler = async (err, req, res, next) => {
  errSts = err.status || 500;
  res.status(errSts);
  res.json({ status: errSts, msg: err.message || "no message", err: err });
};

/* protected route listing. */
// get csrf token

router.post("/", function (req, res, next) {
  res.json({ error: "not Allowed Here" });
});
var csrfProtectedRoute = require("./csrf/index");
var tokenProtected = require("./token/tokenProtected");
router.use("/csrfProtected", csrfProtectedRoute);
router.use("/tokenProtected", tokenProtected);

router.use(function (req, res, next) {
  next(createError(404));
});

router.use(jsonErrorHandler);

module.exports = router;
