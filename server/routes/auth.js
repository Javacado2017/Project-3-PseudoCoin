// Here is where the app looks to validate and sanitize information and add calls to the passport strategy functions and 
// This one in particular is for the authention checks and some validation when the user logs in and signs up. 
// Note that it's requiring the validator package for validation and sanitization. 
// Validattion looks to make certain that the app has the right content or type (i.e. making sure that an email is an email)
// Sanitation cleans and reformates the info (i.e. making sure that maybe username is all lowercase before used by the app)
//  ref used: https://www.youtube.com/watch?v=GOI1AL4Uqbw
    //https://www.npmjs.com/package/validator
    //https://www.youtube.com/watch?v=sakQbeRjgwg&list=PL4cUxeGkcC9jdm7QX143aMLAqyM-jTZ2x
    //https://www.sitepoint.com/local-authentication-using-passport-node-js/  
    //https://ramanasha.blogspot.com/

//Dependencies
const express = require('express');
const validator = require('validator');
const passport = require('passport');
const router = new express.Router();

// Validate the sign up form only
function validateSignupForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';
    // This is to validate an email adress
    if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide a correct email address.';
  }
  // This is tovalidate that our passowrd field is at least 6 letters long  
  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 6) {
    isFormValid = false;
    errors.password = 'Password must have at least 6 characters.';
  }
  // This is is to validate that an name is input
  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Please provide your name.';
  }
  // This is to vlaidate that no fields are blank
  if (!isFormValid) {
    message = 'Check the form for errors.';
  }
  return {
    success: isFormValid,
    message,
    errors
  };
}

//Validate the login form only, basically like the sign in form
function validateLoginForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';
  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false;
    errors.email = 'Please provide your email address.';
  }
    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }
  if (!isFormValid) {
    message = 'Check the form for errors.';
  }
  return {
    success: isFormValid,
    message,
    errors
  };
}


router.post('/signup', (req, res, next) => {
  const validationResult = validateSignupForm(req.body);
  if (!validationResult.success) {
    // Ths 400 status code means that the server cannot or will not process the request due to something 
    // that is perceived to be a client error (see above validations)
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }
  return passport.authenticate('local-signup', (err) => {
    if (err) {
      if (err.name === 'MongoError:' && err.code === 11000) {
        return res.status(409).json({
          success: false,
          message: 'Check the form for errors.',
          errors: {
            email: 'This email is already taken.'
          }
        });
      }
      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }
    return res.status(200).json({
      success: true,
      message: 'You have successfully signed up! Now you should be able to log in.'
    });
  })(req, res, next);
});
router.post('/login', (req, res, next) => {
  const validationResult = validateLoginForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }
  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }
      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }
    return res.json({
      success: true,
      message: 'You have successfully logged in!',
      token,
      user: userData
    });
  })(req, res, next);
});
module.exports = router;

