const mongoose = require("mongoose");

const economy = new mongoose.Schema({
    User: { type: String, require: true },
    Wallet: { type: Number },
    Bank: { type: Number }
});

module.exports = mongoose.model("economy", economy);