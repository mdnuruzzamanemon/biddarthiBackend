const express = require('express');
const { getTrendingCourses, addTrendingCourse, removeTrendingCourse } = require('../controllers/trendingCourseController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getTrendingCourses); // Public
router.post('/add', authMiddleware, addTrendingCourse); // Admin Only
router.post('/remove', authMiddleware, removeTrendingCourse); // Admin Only

module.exports = router;
