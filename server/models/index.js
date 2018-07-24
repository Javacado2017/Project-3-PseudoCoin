// CREATE CONNECTION TO SERVER

// DEPENDENCY FUNCTIONS: 
const mongoose = require('mongoose');

// MONGODB CONNECTION
module.exports.connect = (uri) => {
  mongoose.connect(uri);
  // Set mongo's promise to node's promise library
  // A promise says to wait for the connection to resolve or reject 
  mongoose.Promise = global.Promise;  
  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
    process.exit(1);
  });
  
  // Loads the models
  require('./user');
}; 