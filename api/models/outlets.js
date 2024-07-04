const mongoose = require("mongoose");

const outletSchema = new mongoose.Schema({
    // group: {
    //     type: String,
    //     required: true,
    // },
    outlets: [String]
})

const Outlets = mongoose.model("outlets", outletSchema);

module.exports = Outlets