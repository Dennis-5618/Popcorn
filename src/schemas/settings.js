const mongoose = require("mongoose");

const settings = mongoose.Schema({
    Guild: { type: String, required: true },
    Logchannel: { type: String, required: true },
    Tickets: { type: Array, required: true }
});

module.exports = mongoose.model("settings", settings);