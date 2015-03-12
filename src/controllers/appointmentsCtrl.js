var _ = require('lodash');
var utils = require('../utils/common.js');
var appointmentSvc = require('../models/appointmentSvc');
module.exports = Appointment;
function Appointment() {}

Appointment.prototype.getAppointments = function(req, res) {
    appointmentSvc.getAll().then(function(response) {
        res.json(response);
    }, utils.handlingError(res));
};

Appointment.prototype.saveAppointment = function(req, res) {
    appointmentSvc.save(req.body).then(function(response) {
        res.json(response);
    }, utils.handlingError(res));
};

Appointment.prototype.getAppointmentsByPatient = function(req, res) {
    appointmentSvc.getByPatient(req.params.id).then(function(response) {
        res.json(response);
    }, utils.handlingError(res));
};

Appointment.prototype.removeAppointment = function(req, res) {
    appointmentSvc.remove(req.params.id).then(function(response) {
        res.json({
            success: response ? true : false,
            result: response
        });
    }, utils.handlingError(res));
};
