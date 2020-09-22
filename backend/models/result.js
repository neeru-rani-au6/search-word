let mongoose = require("mongoose");
let Schema = mongoose.Schema;

var Result = new Schema({
    searchWord: {
        type: String,
        required: true,
        unique: true
    },
    result: Object,
}, { timestamps: true });

var Result = mongoose.model('result', Result);

module.exports = Result;
