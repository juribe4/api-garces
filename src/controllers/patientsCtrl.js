var _ = require('lodash');
var utils = require('../utils/common.js');
var patientSvc = require('../models/patientSvc');

module.exports = Patient;

function Patient() {}

Patient.prototype.getPatients = function(req, res) {
    patientSvc.getAll().then(function(response) {
        res.json(response);
    }, utils.handlingError(res));
};

Patient.prototype.getOnePatient = function(req, res) {
    patientSvc.getOne(req.params.id).then(function(response) {
        res.json(response);
    }, utils.handlingError(res));
};

Patient.prototype.savePatient = function(req, res) {
    patientSvc.save(req.body).then(function(response) {
        res.json(response);
    }, utils.handlingError(res));
};

Patient.prototype.removePatient = function(req, res) {
    patientSvc.remove(req.params.id).then(function(response) {
        res.json({
            success: response ? true : false,
            result: response
        });
    }, utils.handlingError(res));
};
