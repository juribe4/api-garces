var _ = require('lodash');
var userSvc = require('../models/userSvc');
var patientSvc = require('../models/patientSvc');
var appointmentSvc = require('../models/appointmentSvc');

module.exports = Routing;

function Routing() {

}

Routing.prototype.users = function(req, res) {
    userSvc.populate()
        .then(function() {
            res.json({
                success: true,
                table: 'users'
            });
        });
};

Routing.prototype.patients = function(req, res) {
    patientSvc.populate()
        .then(function() {
            res.json({
                success: true,
                table: 'patients'
            });
        });
};

Routing.prototype.appointments = function(req, res) {
    appointmentSvc.populate()
        .then(function() {
            res.json({
                success: true,
                table: 'appointments'
            });
        });
};
