const router = require("express").Router();
const auth = require("../config/auth");
const Post = require("../models/Post");

// render single post page
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  let post = await Post.findById(id).populate("user").populate("comments.user").lean(true);
  post.tags = post.tags.split(",");
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

// render edit page
router.get("/edit/:id", auth, async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id).lean(true);
  res.render("edit_post", {
    layout: "main",
    post,
  });
});

// edit post
router.post("/edit", auth, async (req, res) => {
  const { post_id, title, post_body, tags } = req.body;
  await Post.findByIdAndUpdate(post_id, {
    $set: {
      title,
      post_body,
      tags,
    },
  });
  res.redirect("/dashboard");
});

// add comment
router.post("/comments", auth, async (req, res) => {
  const { comment_body, post_id } = req.body;
  const user = req.user._id;
  const new_comment = { comment_body, user };
  const post = await Post.findByIdAndUpdate(post_id, {
    $push: {
      comments: new_comment,
    },
  });
  res.redirect("/posts/" + post_id);
});

// delete post
router.get("/:id/delete", async (req, res) => {
  const { id } = req.params;
  await Post.findByIdAndDelete(id);
  res.redirect("/dashboard");
});

module.exports = router;
