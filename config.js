var bodyParser = require('body-parser');
var express = require('express');
var stylus = require('stylus')
var nib = require('nib');
var logger = require('morgan');

module.exports = function(app) {
    app.set('port', (process.env.PORT || 5000));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    function compile(str, path) {
        return stylus(str)
            .set('filename', path)
            .use(nib());
    }
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(logger('dev'));
    app.use(stylus.middleware({
        src: __dirname + '/public',
        compile: compile
    }));
    app.use(express.static(__dirname + '/public'));
}