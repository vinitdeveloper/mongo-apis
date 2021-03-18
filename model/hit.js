const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create hit schema & model
const HitSchema = new Schema({
    record_id: {
        type: String,
        required: true
    },
    session_id: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        default: 1,
        required: true
    }
});

const Hit = mongoose.model('hit',HitSchema);
module.exports = Hit;