// CREATING PASSPORT LOCAL STRATEGY
// REFERENCES: http://www.passportjs.org/docs/
  // https://github.com/jaredhanson/passport-local
  // https://cdn-images-1.medium.com/max/800/1*SSXUQJ1dWjiUrDoKaaiGLA.png

// DEPENDENCY FUNCTIONS: 
const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../../config');

// LOCAL PASSPORT CONFIGURATION FUNCTIONS:
module.exports = new PassportLocalStrategy({
  // Defines properties in the POST body sent to server, disables session support
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim()
  };

  // Passport conditions and errors 
  return User.findOne({ email: userData.email }, (err, user) => {
    // Compares input to emails in database
    if (err) { return done(err); }

    if (!user) {
      const error = new Error('Incorrect email or password.');
      error.name = 'IncorrectCredentialsError';
      return done(error);
    }

    // Compares hashed user passwords to database
    return user.comparePassword(userData.password, (passwordErr, isMatch) => {
      if (err) { return done(err); }
      if (!isMatch) {
        const error = new Error('Incorrect email or password');
        error.name = 'IncorrectCredentialsError';
        return done(error);
      }
      // If authenticated, defines the payload which contains the JWT claim info
      const payload = {
        sub: user._id
      };
      // Generates JWT string to return to user which is used to make API calls
      const token = jwt.sign(payload, config.jwtSecret);
      const data = {
        name: user.name,
        _id: user._id,
        email: user.email
      };

      return done(null, token, data);
    });
  });
});