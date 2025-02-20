const express = require('express');
const { createDemoVideo, getDemoVideos, getDemoVideoById, updateDemoVideo, deleteDemoVideo } = require('../controllers/demoVideoController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getDemoVideos); // Public route
router.get('/:id', getDemoVideoById); // Public route

router.post('/', authMiddleware, createDemoVideo); // Protected - Only admin can add
router.put('/:id', authMiddleware, updateDemoVideo); // Protected - Only admin can update
router.delete('/:id', authMiddleware, deleteDemoVideo); // Protected - Only admin can delete

module.exports = router;
