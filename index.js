var express = require('express');
var app = express();
require('./config.js')(app);

var guides = require('./models/guidesSchema');
require('./models/mongoose.js');
var routes = require('./routes/routes.js')(app, guides);
app.use('/', routes);

app.listen(app.get('port'), function() {
    console.log('Server running:' + app.get('port'));
});