const router = require("express").Router();
const User = require("../models/User");
const { Types } = require("mongoose");

// get all followers

// follow people
router.post("/follow", async (req, res) => {
  const { userId } = req.body;
  const currentUserId = req.user._id;
  const currentUser = req.user;

  if (currentUser.following.some((id) => id == userId)) {
    await User.findByIdAndUpdate(currentUserId, {
      $pull: {
        following: userId,
      },
    });
    await User.findByIdAndUpdate(userId, {
      $pull: {
        followers: currentUserId,
      },
    });
  } else {
    await User.findByIdAndUpdate(currentUserId, {
      $push: {
        following: userId,
      },
    });
    await User.findByIdAndUpdate(userId, {
      $push: {
        followers: currentUserId,
      },
    });
  }
  res.redirect("back");
});

module.exports = router;
