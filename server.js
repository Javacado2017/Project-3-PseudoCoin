// General node dependencies
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

// Node dependencies for oauth
const cookieParser = require('cookie-parser');
const passport = require('passport');
const config = require('./config');

// Setup express app
const app = express();

// Connect to public and dist directories
app.use(express.static('./server/public/'));
app.use(express.static('./client/dist/js'));

// Connect to the database and load models
var User = require('./server/models/user');
require('./server/models').connect(config.dbUri);

// Setup sessions and cookie-parser between the client and the server
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'some secret password',
    resave: true,
    saveUninitialized: false
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Serialize/DeserializeUser per passport documentation
passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
passport.deserializeUser((_id, done) => {
    User.findById(_id).then((user) => {
        done(null, user);
    });
});

// Load passport local strategy
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// Oauth check middleware
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
