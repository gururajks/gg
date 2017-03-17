var express = require('express');
var mongoose = require('mongoose');
var ObjectId = require('mongoose').Schema.ObjectId;
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
        console.log(username);
        guides.findOne({ username: username, password: password }).exec(function(err, user) {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }
));

//serialize the passport user
passport.serializeUser(function(user, done) {
    if (user) {
        done(null, user._id);
    }
});

//deserialize the passport size
passport.deserializeUser(function(id, done) {
    guides.findOne({ _id: ObjectId(id) }).exec(function(err, user) {
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
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