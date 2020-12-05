/*
    The format for name of video files is IMEI_timestampOfAlarm_number
    having video file in such a format can be useful when querying for
    a particular user and timestamp.
*/

const mongoose = require("mongoose");
const videoSchema = new mongoose.Schema({
    imei:{
        type: Number,
        required: true,
    },
    filename:{
        type: String, 
        required: true,
    },
    data:{
        type: String,
        required: true,
    }
})

const Videos = mongoose.model("Videos", videoSchema);
module.exports = Videos;