const router = require("express").Router();
var csrf = require("csurf");

var csrfProtection = csrf({ cookie: true });
router.use(csrfProtection);

router.use("/", require("./getToken"));
const StepToken = require("./stepToken");
router.use("/stepToken", StepToken);
const signUpSteps = require("./steps/step_route");
router.use("signUpSteps", signUpSteps);

module.exports = router;
