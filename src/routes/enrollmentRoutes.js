const express = require('express');
const {
  enrollStudent,
  getEnrollments,
  approveEnrollment,
  rejectEnrollment,
  deleteEnrollment,
  getEnrollmentCount
} = require('../controllers/enrollmentController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', enrollStudent); // Public
router.get('/', authMiddleware, getEnrollments); // Admin only
router.put('/approve/:id', authMiddleware, approveEnrollment); // Admin only
router.put('/reject/:id', authMiddleware, rejectEnrollment); // Admin only
router.delete('/:id', authMiddleware, deleteEnrollment); // Admin only
router.get('/count/:courseId', getEnrollmentCount); // public

module.exports = router;
