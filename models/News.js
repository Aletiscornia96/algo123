const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    mainImage: { type: String, required: true },
    category: { type:String, required: true},
    additionalImages: [String],
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('News', newsSchema);

