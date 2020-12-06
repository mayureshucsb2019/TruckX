const mongoose = require("mongoose");
const commandSchema = new mongoose.Schema({
    imei:{
        type: Number,
        required: true,
    },
    command:{
        type: String,
        required: true,
    },
    response:{
        type: String,
        default: "pending",
    },
    timeSent:{
        type: Date,
        default: Date.now,

    },
    timeReceived:{
        type: Date,
        default: Date.now,
    },
});

const Command = mongoose.model("Commands", commandSchema);
module.exports = Command;