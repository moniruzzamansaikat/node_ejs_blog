const router = require("express").Router();
const User = require("../models/User");
const auth = require("../config/auth");
const Post = require("../models/Post");

// render posts with tags
router.get("/t/:tag", async (req, res) => {
  const { tag } = req.params;
  const posts = await Post.find({});
  res.render("tagged_posts", {
    layout: "main",
    tag,
  });
});

// render create new post
router.get("/new", auth, (req, res) => {
  res.render("create_post", {
    layout: "main",
  });
});

// render home page
router.get("/", async (req, res) => {
  let posts = await Post.find({}).populate("user").lean(true);
  posts = posts.map((post) => {
    return {
      ...post,
      tags: post.tags.split(","),
    };
  });

  res.render("home", {
    layout: "main",
    posts,
  });
});

// render profile
router.get("/p/:username", async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });

  res.render("profile", {
    layout: "main",
    profileUser: user,
  });
});

module.exports = router;
