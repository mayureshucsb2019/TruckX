/*
    all the alarms must be stored in database with IMEI number
    so that later we can fetch it as per the user's IMEI number

    Alarm Types: VIBRATION, OVERSPEED, CRASH, HARD_ACCELERATION, HARD_BRAKE, SHARP_TURN
*/

const mongoose = require("mongoose");
const locationMessageSchema = new mongoose.Schema({
    imei:{
        type: Number,
        required: true,
    },
    locationTime:{
        type: Date,
        required: true,
    },
    latitude:{
        type: Number,
        required: true,
    },
    longitude:{
        type: Number,
        required: true,

    },
});

const LocationMessage = mongoose.model("LocationMessage", locationMessageSchema);
module.exports = LocationMessage;