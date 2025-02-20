const express = require('express');
const { uploadBanner, getBanner, deleteBanner } = require('../controllers/homeBannerController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware'); // Multer for file uploads

const router = express.Router();

router.get('/', getBanner); // Public route
router.post('/', authMiddleware, upload.single('image'), uploadBanner); // Protected route (Admin)
router.delete('/', authMiddleware, deleteBanner); // Protected route (Admin)

module.exports = router;
