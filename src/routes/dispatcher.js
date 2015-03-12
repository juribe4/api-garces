var bodyParser = require('body-parser');
var multer = require('multer');
module.exports = Routes;

function Routes(app) {

    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    app.use(multer()); // for parsing multipart/form-data

    // Enabling CORS
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        next();
    });

    app.get('/', commonCall('index', 'home'));
    app.get('/users', commonCall('getUsers', 'users'));

    app.get('/patients', commonCall('getPatients', 'patients'));
    app.get('/patients/:id', commonCall('getOnePatient', 'patients'));
    app.put('/patient', commonCall('savePatient', 'patients'));
    app.post('/patient', commonCall('savePatient', 'patients'));
    app.delete('/patient/:id', commonCall('removePatient', 'patients'));

    app.get('/appointments', commonCall('getAppointments', 'appointments'));
    app.get('/appointments/:id', commonCall('getAppointmentsByPatient', 'appointments'));
    app.put('/appointment', commonCall('saveAppointment', 'appointments'));
    app.post('/appointment', commonCall('saveAppointment', 'appointments'));
    app.delete('/appointment/:id', commonCall('removeAppointment', 'appointments'));

    app.get('/stats/patients-by-center', commonCall('patientsByCenter', 'stats'));

    app.get('/populate/users', commonCall('users', 'populate'));
    app.get('/populate/patients', commonCall('patients', 'populate'));
    app.get('/populate/appointments', commonCall('appointments', 'populate'));

    function commonCall(method, ctrlName) {
        return function(req, res) {
            var Ctrl = require('../controllers/' + ctrlName + 'Ctrl');

            // TODO: review scope of 'this'
            Ctrl.prototype[method].call(null, req, res);
        }
    }
}
