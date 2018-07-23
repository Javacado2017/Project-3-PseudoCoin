//Dependencies
const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../../config');

// Module that returns the passport local strategy object
// A lot of this is per passort documentation at http://www.passportjs.org/docs/
module.exports = new PassportLocalStrategy({
  //Passport has it's own input defaults, this is if you want to customize it
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim()
  };

  // This finds a user by email address, note in the models that the schema 
  // set the emails to be unique so a user isn't saved with the same email 
  return User.findOne({ email: userData.email }, (err, user) => {
    if (err) { return done(err); }
    if (!user) {
      const error = new Error('Incorrect email or password');
      error.name = 'IncorrectCredentialsError';
      return done(error);
    }
    // If a hashed user's password from signup is equal to a value saved in the database
    // the app will compate the passwords
    return user.comparePassword(userData.password, (passwordErr, isMatch) => {
      if (err) { return done(err); }
      if (!isMatch) {
        const error = new Error('Incorrect email or password');
        error.name = 'IncorrectCredentialsError';
        return done(error);
      }
      const payload = {
        sub: user._id
      };
      // This uses jsonwebtoken to create a token, note that when a new user is 
      // entered into the database their actual password isn't visible
      const token = jwt.sign(payload, config.jwtSecret);
      const data = {
        name: user.name
      };
      return done(null, token, data);
    });
  });
});