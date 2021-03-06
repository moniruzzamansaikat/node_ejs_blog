const router = require("express").Router();
const User = require("../models/User");
const auth = require("../config/auth");
const Post = require("../models/Post");

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

// render posts with tags
router.get("/t/:tag", async (req, res) => {
  const { tag } = req.params;
  let posts = await Post.find({}).populate("user").lean(true);
  posts = posts.filter((post) => post.tags.includes(tag));
  posts.forEach((post) => (post.tags = post.tags.split(",")));
  res.render("tagged_posts", {
    layout: "main",
    tag,
    posts,
  });
});

// render create new post
router.get("/new", auth, (req, res) => {
  res.render("create_post", {
    layout: "main",
  });
});

// render profile
router.get("/p/:username", async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  const posts = await Post.find({ user }).lean(true);
  posts.forEach((post) => (post.tags = post.tags.split(",")));

  res.render("profile", {
    layout: "main",
    profileUser: user,
    posts,
  });
});

// privacy & policy page
router.get("/privacy", async (req, res) => {
  res.render("admin/privacy_page", {
    layout: "main",
  });
});

module.exports = router;
