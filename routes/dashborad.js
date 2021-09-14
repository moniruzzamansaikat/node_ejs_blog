const router = require("express").Router();

// render dashboard
router.get("/", (req, res) => {
  res.render("dashboard", { layout: "main" });
});

module.exports = router;
