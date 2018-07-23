//This is where the web server is created and we establish passport local strategy for user login
//ref used: https://www.youtube.com/watch?v=w-7RQ46RgxU&list=PL4cUxeGkcC9gcy9lrvMJ75z9maRw4byYp, 
    
//ref used: http://www.passportjs.org/docs/, 
    //https://www.youtube.com/watch?v=sakQbeRjgwg&list=PL4cUxeGkcC9jdm7QX143aMLAqyM-jTZ2x,
    //https://www.sitepoint.com/local-authentication-using-passport-node-js/



// Generaldependencies
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

// Some oauth sepecific dependencies 
const cookieParser = require('cookie-parser');
const passport = require('passport');
const config = require('./config');

// Setup express app
const app = express();

// Tells the app to look into these static files in these directories 
// (remember that webpack uses these for the bundling) 
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));

// Connect to the database and load models
var User = require('./server/models/user');
require('./server/models').connect(config.dbUri);

// Middleware functions between the client and the server which 
// tells the app to parse HTTP body messages
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'some secret password',
    resave: true,
    saveUninitialized: false
}));

// Initialize passport per passport documentation
app.use(passport.initialize());
app.use(passport.session());

// Serialize/DeserializeUser per passport documentation
// It's in this file in case other authentication are used 
// (i.e google, titter, facebook, etc.)
passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
passport.deserializeUser((_id, done) => {
    User.findById(_id).then((user) => {
        done(null, user);
    });
});

// Load passport local strategy per passport documentation
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// Pass to the authenticaion checker, this is middleware functions
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// Setup server side routes to link to client side
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// Open and start server
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log('App listening on PORT ' + PORT);
});
