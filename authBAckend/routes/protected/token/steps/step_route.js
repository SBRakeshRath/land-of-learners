const express = require("express");
const router = express.Router();
router.use(require("./middlewares/decodeToken"));
router.get("/1", (req, res) => {
  res.json({ hello: "boy" });
});
module.exports = router;
