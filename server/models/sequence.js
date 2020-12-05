const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
    maxSingularityId: { type: Number, required: true }
});

module.exports = mongoose.model('Sequence', sequenceSchema);