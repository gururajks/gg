var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

var db = mongoose.connect('mongodb://heroku_zmcpxtsp:ikg9t6o2a99460tntij5vv3s7o@ds155727.mlab.com:55727/heroku_zmcpxtsp');

var guides = require('./models/guidesSchema')
var guideRouter = require('./routes/routes.js')(guides);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', guideRouter);

app.get('/', function(request, response) {
    response.json({ welcome: 'This is My Good Guide API!' });
});

app.listen(3000, function() {
    console.log('Server running');
});