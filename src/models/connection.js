var mongoose = require('mongoose');
var config = require('../config');

module.exports = Connection;

function Connection() {

}

Connection.prototype.connect = function() {
    var database = config.database.name;
    mongoose.set('debug', true);
    mongoose.connect('mongodb://localhost/' + database);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback) {
        console.log('Connected to %s', database);
    });
}
