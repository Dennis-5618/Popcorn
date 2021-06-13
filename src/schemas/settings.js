const mongoose = require("mongoose");

const settings = mongoose.Schema({
    Guild: { type: String, required: true },
    LogChannel: { type: String }
});

module.exports = mongoose.model("Settings", settings);