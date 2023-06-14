const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        maxlength: [12, "Please no can't more than 12"],
        require: true,
        unique: true
    },
    regi_no: {
        type: String,
        maxlength: [15, "Please no can't more than 15"],
        required: true,
        unique: true
    },
    gender: String,
    address: String
});


module.exports = Student = mongoose.model('student', studentSchema);