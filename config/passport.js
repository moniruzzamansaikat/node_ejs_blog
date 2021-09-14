const GitHubStrategy = require("passport-github").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/User");
const {
  Types: { ObjectId },
} = require("mongoose");

const config = (passport) => {
  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  // facebook auth
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:5000/auth/facebook/callback",
      },
      async function (accessToken, refreshToken, profile, cb) {
        const { id, displayName } = profile;
        const foundUser = await User.findOne({ facebookId: id });

        if (foundUser) {
          return cb(null, foundUser);
        }

        const user = await User.create({
          facebookId: id,
          name: displayName,
          username: generateUserName(displayName),
        });
        return cb(null, user);
      }
    )
  );

  // github auth
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/github/callback",
      },
      async function (accessToken, refreshToken, profile, cb) {
        const { id, displayName, photos, profileUrl } = profile;
        const foundUser = await User.findOne({ githubId: id });

        if (foundUser) {
          return cb(null, foundUser);
        }

        const user = await User.create({
          githubId: id,
          name: displayName,
          avatar: photos[0].value,
          githubProfile: profileUrl,
          username: generateUserName(displayName),
        });
        return cb(null, user);
      }
    )
  );
};

module.exports = config;

function generateUserName(string) {
  return [...string.replace(/\s+/g, "")]
    .map((e, i, a) => a[Math.floor(Math.random() * a.length)])
    .join("")
    .trim();
}
