var express = require("express");
var router = express.Router();

const deleteUser = require("./deleteUsersTest");
/* GET home page. */
router.post("/delete", deleteUser);

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
