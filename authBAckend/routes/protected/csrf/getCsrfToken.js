const router = require("express").Router();
var csrf = require("csurf");
var csrfProtection = csrf({ cookie : true});

router.get("/", csrfProtection, (req, res) => {
  
  const token = req.csrfToken();

  res.json({ token: token , cookie : req.cookies });
});
module.exports = router;
