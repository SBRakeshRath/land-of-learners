const router = require("express").Router();
const getCsrfToken = require("./getCsrfToken.js");

//csrf protection

router.use("/", getCsrfToken);
router.use((req, res, next) => {
  console.log(req.headers);
  next();
});
var csrf = require("csurf");
var csrfProtection = csrf({ cookie: true });
router.use(csrfProtection);

// paths

module.exports = router;
