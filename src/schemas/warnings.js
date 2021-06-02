const mongoose = require("mongoose");

const warnSchema = mongoose.Schema({
    Guild: { type: String, required: true },
    Member: { type: String, required: true },
    Reason: { type: Array, required: true}
});

module.exports = mongoose.model("Warnings", warnSchema);