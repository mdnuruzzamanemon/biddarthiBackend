const express = require('express');
const { getTrendingCourses, addTrendingCourse, deleteTrendingCourse } = require('../controllers/trendingCourseController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getTrendingCourses); // Public
router.post('/add', authMiddleware, addTrendingCourse); // Admin Only
router.delete('/:id', authMiddleware, deleteTrendingCourse); // Admin Only

module.exports = router;
