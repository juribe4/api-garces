var mongoose = require('mongoose');
var moment = require('moment');
module.exports = getAppointmentModel();

function getAppointmentModel() {
    // var doctorSchema = mongoose.Schema({
    //     name: String,
    //     comments: String
    // }, { _id : false });

    var appointmentSchema = mongoose.Schema({
        patientId: String,
        center: String,
        symptoms: String,
        diagnostic: String,
        treatment: String,
        prescription: String,
        surgery: Boolean,
        // doctors: [ doctorSchema ],
        turn: Number,
        date: Date
    }, {
        collection: 'appointments'
    });

    appointmentSchema.virtual('dateDMY').get(function() {
        return moment(this.date).format('DD/MM/YYYY')
    });

    // To enable virtual in the response
    appointmentSchema.set('toJSON', { virtuals: true });
    appointmentSchema.set('toObject', { virtuals: true });

    return mongoose.model('Appointment', appointmentSchema);
}
