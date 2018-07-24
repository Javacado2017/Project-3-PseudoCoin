// CREATE USER SCHEMA

// DEPENDENCY FUNCTIONS: 
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// DEFINE SCHEMA
const UserSchema = new mongoose.Schema({
  email: {
      type: String,
      index: { unique: true }
  },
  password: String,
  name: String,
  jwtToken: String
});

// This compares the passed password with the value in the database. 
// Uses a parameter in string format and returns the callback object
UserSchema.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, callback);
};
// This is a pre-save hook method to save the user if they're already logged in. 
UserSchema.pre('save', function saveHook(next) {
  const user = this;
  // Proceed is the password is modified or is the user is new
  if (!user.isModified('password')) return next();
  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) { return next(saltError); }
    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) { return next(hashError); }
      // Replaces a password string with hash value
      user.password = hash;
      return next();
    });
  });
});

// Export the module
module.exports = mongoose.model('User', UserSchema);