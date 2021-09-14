const router = require("express").Router();
const auth = require("../config/auth");
const Post = require("../models/Post");

// render single post page
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  let post = await Post.findById(id).populate("user").lean(true);
  post.tags = post.tags.split(",");
  console.log(post);
  res.render("single_post", {
    layout: "main",
    post,
  });
});

// add new post with json
router.post("/", auth, async (req, res) => {
  const { title, post_body, tags } = req.body;

  const post = await Post.create({
    title,
    post_body,
    tags,
    user: req.user._id,
  });

  res.status(201).json({ success: true });
});

module.exports = router;
