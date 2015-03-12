var _ = require('lodash');
var userSvc = require('../models/userSvc');
module.exports = Routing;

function Routing() {

}

Routing.prototype.getUsers = function(req, res) {
    userSvc.getAll().then(function(response) {
        res.json(response);
    });
};
