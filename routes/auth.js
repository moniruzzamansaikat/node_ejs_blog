const router = require("express").Router();
const passport = require("passport");

// github login
router.post("/github", passport.authenticate("github"));
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/auth/login" }),
  function (req, res) {
    res.redirect("/");
  }
);

// facebook login
router.post("/facebook", passport.authenticate("facebook"));
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/auth/login" }),
  function (req, res) {
    res.redirect("/");
  }
);

// logout user
router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

router.get("/login", (req, res) => {
  res.render("login", {
    layout: "main",
  });
});

router.get("/signup", (req, res) => {
  res.render("signup", {
    layout: "main",
  });
});

module.exports = router;
