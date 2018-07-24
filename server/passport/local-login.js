// CREATING PASSPORT LOCAL STRATEGY
// REFERENCES: http://www.passportjs.org/docs/
  // https://github.com/jaredhanson/passport-local
  // https://cdn-images-1.medium.com/max/800/1*SSXUQJ1dWjiUrDoKaaiGLA.png

// DEPENDENCY FUNCTIONS: 
const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../../config');

// LOCAL PASSPORT STRATEGY FUNCTIONS:
module.exports = new PassportLocalStrategy({
  // Defines properties in the POST body sent to server
  // Disables session support
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
    const userData = {
      email: email.trim(),
      password: password.trim()
    };

  // Passport congifuration and errors 
  return User.findOne({ email: userData.email }, (err, user) => {
    // Compares input to emails in database
    if (err) { return done(err); }
    if (!user) {
      const error = new Error('Incorrect email or password');
      error.name = 'IncorrectCredentialsError';
      return done(error);
    }
    // Compares hashed user passwords
    return user.comparePassword(userData.password, (passwordErr, isMatch) => {
      if (err) { return done(err); }
      if (!isMatch) {
        const error = new Error('Incorrect email or password');
        error.name = 'IncorrectCredentialsError';
        return done(error);
      }
      // If authenticated, defines the payload which contains the claim information
      const payload = {
        sub: user._id
      };
      // Generates JWT to return to user which is used to make API calls
      const token = jwt.sign(payload, config.jwtSecret);

      const data = {
        name: user.name
      };

      return done(null, token, data);
    });
  });
});