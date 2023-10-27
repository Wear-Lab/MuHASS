const mongoose = require('mongoose');

const userInfoSchema = new mongoose.Schema({
    // ENMO (Processed IMU data)
    ENMO: {
        type: String,
        required: true
    },
    // PPG Heart Rate
    HR: {
        type: String,
        required: true
    },
    // PPG SpO2
    SpO2:{
        type: String,
        required: true
    },
    // GSR
    GSR:{
        type: String,
        required: true
    },
    // LPA and MVPA
    LPA: {
        type: String,
        required: true
    },
    MVPA: {
        type: String,
        required: true
    },
// User settings?
})


module.exports = mongoose.model('UserInfo', userInfoSchema)


/* MongoDB parameters per user: */

// ENMO (Processed IMU data)
// Environment (Temperature, Pressure, Humidity, Altitude?, Mic?)
// PPG Heart Rate
// PPG SpO2
// GSR
// LPA and MVPA
// User settings?

