const mongoose = require("mongoose");

const Settings = mongoose.Schema({
    Guild: { type: String, required: true },
    Logchannel: { type: String },
    Tickets: { type: Array, required: true }
});

module.exports = mongoose.model("Settings", Settings);