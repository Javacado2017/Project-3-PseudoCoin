// Dependencies
const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../../config');

// This module passport local strategy object.
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim()
  };

  // This will find a user by email address else log out an error
  return User.findOne({ email: userData.email }, (err, user) => {
    if (err) { return done(err); }

    if (!user) {
      const error = new Error('Incorrect email or password');
      error.name = 'IncorrectCredentialsError';

      return done(error);
    }

    // Check if a hashed user's password is equal to a value saved in the database
    // remember that you can hash the passowrd before saving it to the database. 
    // Passport-local will not allow you to do this so the coder needs to take care of handlign credentials. 
    // this is where bcrypt and using tokens are possible 
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

      // Create a JWT token string
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