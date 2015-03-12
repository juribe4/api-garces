var mongoose = require('mongoose');
module.exports = getUserModel();

function getUserModel() {
    var userSchema = mongoose.Schema({
        name: String,
        age: Number
    }, {
        collection: 'users'
    });

    userSchema.methods.speak = function() {
        console.log('I\'m' + this.name);
    }

    return mongoose.model('User', userSchema);
}
