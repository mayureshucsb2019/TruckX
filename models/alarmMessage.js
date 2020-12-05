/*
    all the alarms must be stored in database with IMEI number
    so that later we can fetch it as per the user's IMEI number

    Alarm Types: VIBRATION, OVERSPEED, CRASH, HARD_ACCELERATION, HARD_BRAKE, SHARP_TURN

    ASSUMPTION: Whenever the message is send we want that the Dashcam must upload the data
    in chunks. Say, Dashcan uploads the data for 5 minutes each of past 30 minutes in the
    format where name of files is IMEI_timestampOfAlarm_1, IMEI_timestampOfAlarm_2, ... .
    So we will have the list of files at the time when then alarm message is being generated
    and then video files can be stored later.
*/

const mongoose = require("mongoose");
const alarmMessageSchema = new mongoose.Schema({
    imei:{
        type: Number,
        required: true,
    },
    alarmType:{
        type: String,
        required: true,
    },
    alarmTime:{
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
    fileList:{
        type: Array,
    }
});

const AlarmMessage = mongoose.model("AlarmMessage", alarmMessageSchema);
module.exports = AlarmMessage;