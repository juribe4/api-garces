var Q = require('q');
var _ = require('lodash');
var mongoose = require('mongoose');
var utils = require('../utils/common');


var AppointmentModel = require('./appointmentModel');
var appointmentMock = require('./appointmentMock');


module.exports = new AppointmentSvc();
function AppointmentSvc() {}

AppointmentSvc.prototype.getAll = function() {
    var deferred = Q.defer();
    AppointmentModel.find({}, utils.handlingResponse(deferred, 'ERROR getting all appointments'));
    return deferred.promise;
};

AppointmentSvc.prototype.getByPatient = function(id) {
    var deferred = Q.defer();
    AppointmentModel.find({
        patientId: id
    }, null, {
        sort:{
            date: 1 //Sort by Date Added ASC
        }
    }, utils.handlingResponse(deferred, 'ERROR getting all appointments'));
    return deferred.promise;
};

AppointmentSvc.prototype.save = function(data) {
    var deferred = Q.defer();
    AppointmentModel.find({
        date: data.date
    }, function(err, response) {
        if(response.length == 0) {
            if(data._id) {
                AppointmentModel.findByIdAndUpdate({
                    _id: data._id
                }, {
                    $set: data
                }, utils.handlingResponse(deferred, 'ERROR updating appointment'));
            }
            else {
                var appointment = new AppointmentModel(data);
                appointment.save(utils.handlingResponse(deferred, 'ERROR saving appointment'));
            }
        }
        else {
            deferred.reject('DUPLICATED_DATE');
        }
    });

    return deferred.promise;
};

AppointmentSvc.prototype.remove = function(id) {
    var deferred = Q.defer();
    AppointmentModel.remove({
        _id: id
    }, utils.handlingResponse(deferred, 'ERROR removing patient'));
    return deferred.promise;
};

AppointmentSvc.prototype.populate = function() {
    var deferred = Q.defer(),
        success = true
        error = {};

    mongoose.connection.db.dropCollection('appointments', function(err, result) {
        if(err) {
            console.log('ERROR dropping appointments:', err);
            deferred.reject(err);
            success = false;
        }
        else {
            console.log('Done! Collection appointments dropped.', result);
        }

    });

    _.each(appointmentMock, function(item) {
        var appointment = new AppointmentModel(item);
        appointment.save(function(err, response) {
            if(err) {
                console.log('ERROR  saving appointment');
                success = false;
            }
            else {
                console.log('Appointment saved');
            }
        });
    });

    if(success) {
        deferred.resolve();
    }
    return deferred.promise;
};
