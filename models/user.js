/*
    Secret stored in this schema must be the hashed token for the original token.
*/

const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    imei:{
        type: Number,
        required: true,
        unique: true,
    },
    secret:{
        type: String,
        required: true,
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;