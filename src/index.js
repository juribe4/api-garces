var express = require('express');
var config = require('./config');




// Connecting to the database
var Connection = require('./models/connection');
Connection.prototype.connect();



// Express App
var app = module.exports = express();
require('./routes/dispatcher')(app);

// Starting the server
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server listening at http://%s:%s', host, port);
});
