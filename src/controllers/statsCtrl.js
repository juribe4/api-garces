var _ = require('lodash');
var utils = require('../utils/common.js');
var patientSvc = require('../models/patientSvc');
var statsSvc = require('../models/statsSvc');

module.exports = Stats;

function Stats() {}

Stats.prototype.patientsByCenter = function(req, res) {
    statsSvc.getPatientsByCenter().then(function(response) {
        res.json(response);
    }, statsError(res));
};

function statsError(res) {
    return function (error) {
        res
            .status(404)
            .json({
                success: false,
                error: error
            });
    }
}
