const mongoose = require('mongoose');

const HomeBannerSchema = new mongoose.Schema({
  image: { type: String, required: true } // Stores image file path
}, { timestamps: true });

module.exports = mongoose.model('HomeBanner', HomeBannerSchema);
