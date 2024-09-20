const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    mainImage: { type: String, required: true },
    body: { type: String, required: true },
    additionalMedia: [{ type: String }], // Imágenes o videos adicionales
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 }, // Orden personalizado
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('News', newsSchema);
