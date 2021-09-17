require("dotenv").config();

const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const passport = require("passport");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const auth = require("./config/auth");

const app = express();
app.set("view engine", "ejs");

// config passport & db
require("./config/db")(mongoose);
require("./config/passport")(passport);

app.use(ejsLayouts);
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "saldkfjasldkfjalskdjflkj",
    saveUninitialized: false,
    store: new MongoStore({
      mongoUrl: process.env.DB_URL,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

// set locals
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

// routes
app.use("/", require("./routes/index"));
app.use("/dashboard", auth, require("./routes/dashborad"));
app.use("/setting", auth, require("./routes/setting"));
app.use("/users", auth, require("./routes/users"));
app.use("/admin", mustBeAdmin, require("./routes/admin"));
app.use("/posts", require("./routes/posts"));
app.use("/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server is running on port, " + PORT);
});

// todo: change this somewhere else
function mustBeAdmin(req, res, next) {
  const { user } = req;
  if (!user || !user.isAdmin) {
    return res.redirect("back");
  }

  next();
}
