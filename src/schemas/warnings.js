const mongoose = require("mongoose");

const warnings = mongoose.Schema({
    Guild: { type: String, required: true },
    User: { type: String, required: true },
    Reason: { type: Array, required: true }
});

module.exports = mongoose.model("warnings", warnings);