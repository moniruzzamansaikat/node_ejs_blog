const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

// render dashboard
router.get("/", async (req, res) => {
  const user = req.user._id;
  const posts = await Post.find({ user }).lean(true);
  res.render("dashboard", { layout: "main", posts });
});

// render followers
router.get("/followers", async (req, res) => {
  const followers_ids = req.user.followers;
  const followers = await User.find({ _id: { $in: followers_ids } }).lean();
  res.render("followers_page", { layout: "main", followers });
});

// render following
router.get("/following", async (req, res) => {
  const following_ids = req.user.following;
  const followers = await User.find({ _id: { $in: following_ids } }).lean();
  res.render("following_page", { layout: "main", followers });
});

module.exports = router;
