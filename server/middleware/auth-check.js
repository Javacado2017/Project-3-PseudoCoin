// CREATE MIDDLEWARE FUNCTIONS FOR AUTHENICATION CHECKS
// REFERENCES: https://cdn-images-1.medium.com/max/800/1*SSXUQJ1dWjiUrDoKaaiGLA.png

// DEPENDENCY FUNCTIONS: 
const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const config = require('../../config');

// Authentication check, decodes what was encrypted
// This uses JSON web tokens which allows you to send informatin securely. 
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }
  // This gets the authorization header string, then decodes the token using a secret phrase 
  // from the config file. The 401 code is when there's an unauthorized status
  const token = req.headers.authorization.split(' ')[1];
  
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) { return res.status(401).end(); }
    const userId = decoded.sub;
    
    // This checks to see if a user exists
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).end();
      }
      return next();
    });
  });
};