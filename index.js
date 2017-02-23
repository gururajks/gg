var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

var db = mongoose.connect('mongodb://127.0.0.1:27017/goodguidedb');

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