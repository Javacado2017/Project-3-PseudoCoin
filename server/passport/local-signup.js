// CREATING PASSPORT SIGNUP STRATEGY
// REFERENCES: http://www.passportjs.org/docs/

// DEPENDENCY FUNCTIONS:
const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;

// SIGNUP PASSPORT CONFIGURATION FUNCTIONS:
module.exports = new PassportLocalStrategy({
  // Defines properties in the POST body sent to server, disables session support
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim(),
    name: req.body.name.trim()
  };

  const newUser = new User(userData);
  newUser.save((err) => {
    if (err) { return done(err); }
    return done(null);
  });
});