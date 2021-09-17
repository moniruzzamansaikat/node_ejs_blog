const User = require("../models/User");
const router = require("express").Router();

router.get("/", async (req, res) => {
  const users = await User.find({}).lean(true);
  res.render("admin/index", {
    layout: "main",
    users,
  });
});

module.exports = router;
