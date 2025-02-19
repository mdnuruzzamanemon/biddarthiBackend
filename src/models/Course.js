const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  thumbnail: { type: String, required: true }, // Will store file path
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number, default: 0 },
  description: { type: String, required: true },
  instructor: { type: String, required: true },
  discountEndsAt: { type: Date, required: false },
  demoVideo: { type: String, required: false }
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);
