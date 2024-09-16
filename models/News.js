const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    mainImage: { type: String },
    category: { type:String, required: true},
    additionalImages: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('News', newsSchema);


