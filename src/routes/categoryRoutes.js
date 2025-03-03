const express = require('express');
const { 
  createCategory, 
  getCategories, 
  getCategoryById, 
  updateCategory, 
  deleteCategory,
  checkCategoryDependencies 
} = require('../controllers/categoryController');
const authMiddleware = require('../middlewares/authMiddleware'); // Protect routes

const router = express.Router();

router.post('/', authMiddleware, createCategory); // Create a category (Protected)
router.get('/', getCategories); // Get all categories (Protected)
router.get('/:id', authMiddleware, getCategoryById); // Get single category (Protected)
router.put('/:id', authMiddleware, updateCategory); // Update category (Protected)
router.delete('/:id', authMiddleware, deleteCategory); // Delete category (Protected)
router.get("/check-dependencies/:id", checkCategoryDependencies);

module.exports = router;
