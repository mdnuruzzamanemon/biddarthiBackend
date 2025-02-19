const mongoose = require('mongoose');

const TrendingCourseSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', unique: true },
  addedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TrendingCourse', TrendingCourseSchema);
