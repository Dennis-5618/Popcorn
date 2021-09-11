const mongoose = require("mongoose");

const economy = mongoose.Schema({
    User: { type: String, required: true },
    Wallet: { type: Number, required: true },
    Bank: { type: Number, required: true },
    Inventory: { type: Object, required: true }
});

module.exports = mongoose.model("economy", economy);