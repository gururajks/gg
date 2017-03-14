var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var app = express();


//config the app 
require('./config.js')(app);

//schema for the mongo db that uses the guides document
var guides = require('./models/guidesSchema');

//setup the mongoose db connection
require('./models/mongoose.js');

//authenticate using the passport middelware
passport.use(new LocalStrategy(
    function(username, password, done) {
        guides.findOne({ username: username }).exec(function(err, user) {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }

        });
    }
));

passport.serializeUser(function(user, done) {
    if (user) {
        done(null, user._id);
    }
});

passport.deserializeUser(function(id, done) {
    User.findOne({ _id, id }).exec(function(err, user) {
        if (user) {
            return done(null, user);
        } else {
            return done(null, fase);
        }
    });
});


//create the routes
var routes = require('./routes/routes.js')(app, guides);
//use the routes so that they are available
app.use('/', routes);
//listen to the server
app.listen(app.get('port'), function() {
    console.log('Server running:' + app.get('port'));
});