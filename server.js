// Code to create web server, passport strategies, 

//ref used: https://www.youtube.com/watch?v=w-7RQ46RgxU&list=PL4cUxeGkcC9gcy9lrvMJ75z9maRw4byYp, 
//ref used: http://www.passportjs.org/docs/, 
    //https://www.youtube.com/watch?v=sakQbeRjgwg&list=PL4cUxeGkcC9jdm7QX143aMLAqyM-jTZ2x,
    //https://www.sitepoint.com/local-authentication-using-passport-node-js/


// General dependencies
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

// Oauth dependencies 
const cookieParser = require('cookie-parser');
const passport = require('passport');
const config = require('./config');

// Setup express app
const app = express();

// Tells app to use static files to render to browser 
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));

// DATABASE CALL FUNCTIONS:
// Connect to the database and load models
var User = require('./server/models/user');
require('./server/models').connect(config.dbUri);

// MIDDLEWARE FUNCTIONS:  
// Tells app to parse cookie headers sent between cilent and server
app.use(cookieParser());
// Tells app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));
// Tells app to authenticate sessions between the cient and the server
app.use(session({
    secret: 'some secret password',
    resave: true,
    saveUninitialized: false
}));

// PASSPORT FUNCTIONS: 
// Initialize passport session
app.use(passport.initialize());
app.use(passport.session());

// Serialize/Deserialize passport user 
passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
passport.deserializeUser((_id, done) => {
    User.findById(_id).then((user) => {
        done(null, user);
    });
});

// Passport local strategy
const localSignupStrategy = require('./server/passport/local-signup');
passport.use('local-login', localLoginStrategy);

// Passport local-signup strategy
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);

// Middleware authentication check
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// ROUTE FUNCTIONS:
// Tells app to use these routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// SERVER FUNCTIONS: 
// Tells app to open and start server
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log('App listening on PORT ' + PORT);
});
