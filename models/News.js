const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type:String, required: true},
  mainImage: { type: String, required: true },
  body: [{ type: Map, of: String }],
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('News', NewsSchema);
