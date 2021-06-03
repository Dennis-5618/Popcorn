const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
    Guild: { type: String, required: true },
    Info: { type: Array, required: true }
});

module.exports = mongoose.model("Tickets", ticketSchema)