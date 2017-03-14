var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://heroku_zmcpxtsp:ikg9t6o2a99460tntij5vv3s7o@ds155727.mlab.com:55727/heroku_zmcpxtsp');

db.connection.on('error', function(err) {
    console.log(err);
});

db.connection.once('open', function() {
    console.log('mongodb connected');
});