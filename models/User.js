const { model, Schema, Types } = require("mongoose");

const UserSchema = new Schema({
  username: String,
  name: String,
  email: String,
  githubId: String,
  facebookId: String,
  avatar: { type: String, default: "https://avatars.githubusercontent.com/u/72160277?v=4" },
  website_url: { type: String, default: "" },
  location: { type: String, default: "" },
  skills: { type: String, default: "" },
  bio: { type: String, default: "" },
  posts: [{ type: Types.ObjectId, ref: "Post" }],
  followers: [{ type: Types.ObjectId, ref: "User" }],
  following: [{ type: Types.ObjectId, ref: "User" }],
});

const User = model("User", UserSchema);
module.exports = User;
