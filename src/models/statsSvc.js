var Q = require('q');
var _ = require('lodash');
var utils = require('../utils/common');
var mongoose = require('mongoose');
var moment = require('moment');
var PatientModel = require('./patientModel');

module.exports = new StatsSvc();
function StatsSvc() {}

StatsSvc.prototype.getPatientsByCenter = function() {
    var deferred = Q.defer();
    PatientModel.aggregate(
        {
            $group: {
                _id: {
                    center: { $toLower: "$medicalInfo.center" },
                    gender: { $toLower: "$gender" }
                },
                counter: { $sum : 1 }
            },
        },
        {
            $group: {
                _id: "$_id.center",
                gender: {
                    $push: { gender: "$_id.gender", counter: "$counter" }
                },
            }
        },
        utils.handlingResponse(deferred, 'ERROR')
    );
    return deferred.promise;
}
