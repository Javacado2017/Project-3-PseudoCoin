// Here is where the app add calls to the passport strategy functions
// This one in particular is for the authention checks
//  ref used: https://www.youtube.com/watch?v=sakQbeRjgwg&list=PL4cUxeGkcC9jdm7QX143aMLAqyM-jTZ2x
    //https://www.sitepoint.com/local-authentication-using-passport-node-js/  
    //https://ramanasha.blogspot.com/

//Dependencies
const express = require('express');
const validator = require('validator');
const passport = require('passport');
const router = new express.Router();

