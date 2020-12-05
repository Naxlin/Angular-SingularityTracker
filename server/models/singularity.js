const mongoose = require('mongoose');

const singularitySchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    imageUrl: { type: String },
    material: { type: String },
    amount: { type: Number },
    compoundOf: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Singularity' }]    
});

module.exports = mongoose.model('Singularity', singularitySchema);