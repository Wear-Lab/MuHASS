const mongoose = require('mongoose');

const environmentSchema = new mongoose.Schema({
    // Environment (Temperature, Pressure, Humidity, Altitude?, Mic?)
    Temperature: {
        type: String,
        required: true
    },
    Pressure: {
        type: String,
        required: true
    },
    Humidity: {
        type: String,
        required: true
    },
    Altitude: {
        type: String,
        required: true
    },
    // Mic:{
    
    // },
})


module.exports = mongoose.model('Environment', environmentSchema)

/* MongoDB parameters per user: */
// Environment (Temperature, Pressure, Humidity, Altitude?, Mic?)

