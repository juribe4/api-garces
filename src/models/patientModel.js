var mongoose = require('mongoose');
var moment = require('moment');
module.exports = getPatientModel();

function getPatientModel() {
    var patientSchema = mongoose.Schema({
        name: {
            first: String,
            firstSurname: String,
            secondSurname: String
        },

        birthDate: {
            type: Date,
            default: Date.now
        },

        gender: {
            type: String,
            enum: ['male', 'female']
        },

        district: String,
        province: String,
        address: String,
        phone: String,
        mobile: String,
        email: String,

        coupleName: String,
        maritalStatus: {
            type: String,
            enum: ['single', 'married', 'divorced', 'widowed', 'cohabitant']
        },

        children: Number,
        jobTitle: String,
        company: String,
        mailing: {
            type: Boolean,
            default: false
        },

        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: "active"
        },

        medicalInfo: {
            center: {
                type: String,
                enum: ['CM', 'SI', 'SF']
            },
            provenance: String,
            diagnostic: String,
            diseases: String,
            treatment: String
        },

        registerDate: {
            type: Date,
            default: Date.now
        }
    }, {
        collection: 'patients'
    });

    patientSchema.virtual('fullname').get(function () {
        return this.name.first + ' ' + this.name.firstSurname + ' ' + this.name.secondSurname;
    });

    patientSchema.virtual('age').get(function () {
        return moment().diff(this.birthDate, 'years');
    });

    patientSchema.virtual('birthDateDMY').get(function() {
        return moment(this.birthDate).format('DD/MM/YYYY')
    });

    patientSchema.virtual('registerDateDMY').get(function() {
        return moment(this.registerDate).format('DD/MM/YYYY')
    });

    patientSchema.path('maritalStatus').validate(function(value) {
        return /single|married|divorced|widowed/i.test(value);
    }, 'Invalid marital status');

    // To enable virtual in the response
    patientSchema.set('toJSON', { getters:true, virtuals: true });
    patientSchema.set('toObject', { virtuals: true });

    return mongoose.model('Patient', patientSchema);
}
