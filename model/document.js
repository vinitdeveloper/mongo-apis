const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create student schema & model
const DocumentSchema = new Schema({
    record_id: {
        type: String,
    },
    field1: {
        type: String,
    },
    field2: {
        type: String,
    }
});

const Document = mongoose.model('document',DocumentSchema);
module.exports = Document;