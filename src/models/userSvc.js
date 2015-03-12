var Q = require('q');
var _ = require('lodash');
var mongoose = require('mongoose');
var UserModel = require('./userModel');
var UserMock = require('./userMock');

module.exports = new UserSvc();


function UserSvc() {

}

UserSvc.prototype.getAll = function() {
    var deferred = Q.defer();
    UserModel.find({}, function(err, response) {
        if(err) {
            return deferred.reject(err);
        }

        deferred.resolve(response);
    });

    return deferred.promise;
};

UserSvc.prototype.populate = function() {
    var deferred = Q.defer();
    mongoose.connection.db.dropCollection('users', function(err, result) {
        if(err) {
            console.log('ERROR:', err);
            return;
        }

        console.log('Done! Collection dropped.', result);
    });

    _.each(UserMock, function(item) {
        var user = new UserModel(item);
        user.save(function(err, response) {
            if(err) {
                console.log("ERROR: ", err);
                return;
            }

            console.log('Saved', item.name);
        });
    });

    deferred.resolve();
    return deferred.promise;
};
