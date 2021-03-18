const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create student schema & model
const HitSchema = new Schema({
    record_id: {
        type: String,
    },
    session_id: {
        type: String,
    },
    count: {
        type: Number,
        default: 1
    }
});

const Hit = mongoose.model('hits',HitSchema);
module.exports = Hit;