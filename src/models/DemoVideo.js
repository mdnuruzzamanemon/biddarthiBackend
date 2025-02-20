const mongoose = require('mongoose');

const DemoVideoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true }, // Demo Class Title
  videoLink: { type: String, required: true }, // Video Link
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Reference to Category
  instructor: { type: String, required: true } // Instructor Name
}, { timestamps: true });

module.exports = mongoose.model('DemoVideo', DemoVideoSchema);
