const { Schema, Types, model } = require("mongoose");

const PostSchema = new Schema({
  title: { type: String, required: true },
  tags: { type: String, required: true },
  post_body: { type: String, required: true },
  user: {
    type: Types.ObjectId,
    ref: "User",
  },
  reactions: { type: Number, default: 0 },
  comments: [{ type: Types.ObjectId, ref: "User" }],
});

const Post = model("Post", PostSchema);
module.exports = Post;
