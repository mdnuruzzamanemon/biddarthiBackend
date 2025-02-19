const express = require('express');
const { createCourse, getCourses, getCourseById, updateCourse, deleteCourse } = require('../controllers/courseController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware'); // For handling file uploads

const router = express.Router();

router.get('/', getCourses); // Public Route
router.get('/:id', getCourseById); // Public Route

router.post('/', authMiddleware, upload.single('thumbnail'), createCourse);
router.put('/:id', authMiddleware, upload.single('thumbnail'), updateCourse);
router.delete('/:id', authMiddleware, deleteCourse);

module.exports = router;
