var Q = require('q');
var _ = require('lodash');
var utils = require('../utils/common');
var moment = require('moment');


var mongoose = require('mongoose');
var PatientModel = require('./patientModel');
var patientMock = require('./patientMock');

var AppointmentSvc = require('./appointmentSvc');
var AppointmentModel = require('./appointmentModel');

module.exports = new PatientSvc();
function PatientSvc() {}

PatientSvc.prototype.getAll = function() {
    var deferred = Q.defer();
    PatientModel.find({}, utils.handlingResponse(deferred, 'ERROR getting all patients'));
    return deferred.promise;
};

PatientSvc.prototype.getOne = function(id) {
    var deferred = Q.defer();
    PatientModel.findOne({
        _id: id
    }, utils.handlingResponse(deferred, 'ERROR gettint patient ' + id));
    return deferred.promise;
};

PatientSvc.prototype.save = function(data) {
    var deferred = Q.defer();
    if(data._id) {
        PatientModel.findByIdAndUpdate({
            _id: data._id
        }, {
            $set: data
        }, utils.handlingResponse(deferred, 'ERROR updating patient'));
    }
    else {
        var patient = new PatientModel(data);
        patient.save(utils.handlingResponse(deferred, 'ERROR saving patient'));
    }
    return deferred.promise;
};

PatientSvc.prototype.remove = function(id) {
    var deferred = Q.defer();
    PatientModel.remove({
        _id: id
    }, function(err, response) {
        if(err) {
            deferred.reject(err);
        }
        else {
            var success = true;
            AppointmentSvc.getByPatient(id).then(function(response) {
                _.each(response, function(item) {
                    AppointmentModel.remove({
                        _id: item.id
                    }, function(errApp, responseApp) {
                        if(errApp) {
                            deferred.reject(errApp);
                            success = false;
                        }
                    });
                });

                if(success) {
                    deferred.resolve();
                }
            });
        }
    });
    return deferred.promise;
};

PatientSvc.prototype.populate = function() {
    var deferred = Q.defer();
    mongoose.connection.db.dropCollection('patients', function(err, result) {
        if(err) {
            console.log('ERROR dropping patients:', err);
            deferred.reject(err);
        }
        else {
            console.log('Done! Collection patients dropped.', result);
        }
    });

    var success = true;
    _.each(patientMock, function(item) {
        var patient = new PatientModel(item);
        patient.save(function(err, response) {
            success = success && !!err;
            if(err) {
                console.log("ERROR saving patient: ", err);
                deferred.reject(err);
            }
            else {
                console.log('Done! Patient saved');
            }
        });

        if(success) {
            deferred.resolve();
        }
    });

    return deferred.promise;
};
