const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    imei:{
        type: Number,
        required: true,
        unique: true,
    },
    secret:{
        type: String,
        default: "secret",
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;