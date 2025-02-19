const TrendingCourse = require('../models/TrendingCourse');
const Course = require('../models/Course');

// @desc Get Trending Courses (Max 4)
exports.getTrendingCourses = async (req, res) => {
  try {
    const trendingCourses = await TrendingCourse.find()
      .sort({ addedAt: -1 }) // Get latest 4
      .limit(4)
      .populate('course');

    res.status(200).json(trendingCourses);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc Add a Course to Trending (Ensure only 4 remain)
exports.addTrendingCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // Check if already trending
    const existing = await TrendingCourse.findOne({ course: courseId });
    if (existing) {
      return res.status(400).json({ message: 'Course is already trending' });
    }

    // Insert new trending course
    await TrendingCourse.create({ course: courseId });

    // Ensure only 4 remain (delete the oldest if needed)
    const trendingCourses = await TrendingCourse.find().sort({ addedAt: -1 });
    if (trendingCourses.length > 4) {
      await TrendingCourse.findByIdAndDelete(trendingCourses[4]._id);
    }

    res.status(200).json({ message: 'Course added to trending' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc Remove Course from Trending
exports.removeTrendingCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    const trendingCourse = await TrendingCourse.findOneAndDelete({ course: courseId });
    if (!trendingCourse) {
      return res.status(404).json({ message: 'Course not found in trending' });
    }

    res.status(200).json({ message: 'Course removed from trending' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
