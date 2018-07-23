//Dependencies
const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const config = require('../../config');

// Authentication check, decodes what was encrypted
// This uses JSON web tokens (aka. JWT). This allows you to send informatin securely. 
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }
  // This gets the authorization header string, then decodes the token useing a secret phase
  // The 401 code is when there's an unauthorized status
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