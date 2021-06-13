const mongoose = require("mongoose");

const logChannel = mongoose.Schema({
    Guild: { type: String, required: true },
    LogChannel: { type: String }
});

module.exports = mongoose.model("Settings", logChannel);