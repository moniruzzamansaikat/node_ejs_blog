const router = require("express").Router();
const User = require("../models/User");

// render setting page
router.get("/", (req, res) => {
  res.render("setting", { layout: "main" });
});

// update information
router.post("/update", async (req, res) => {
  const { name, email, username, website_url, location, bio, skills } = req.body;
  const mainUser = {
    name: name || req.user.name,
    email: email || req.user.email,
    username: username || req.user.username,
    website_url: website_url || req.user.website_url,
    location: location || req.user.location,
    skills: skills || req.user.skills,
    bio: bio || req.user.bio,
  };

  await User.findByIdAndUpdate(req.user._id, {
    $set: {
      ...mainUser,
    },
  });

  res.redirect("/setting");
});

module.exports = router;
