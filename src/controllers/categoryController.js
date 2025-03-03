const Category = require('../models/Category');
const Course = require("../models/Course");
const DemoVideo = require("../models/DemoVideo");

// Create a new category
const createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    
    // Check if category already exists
    const existingCategory = await Category.findOne({ categoryName });
    if (existingCategory) return res.status(400).json({ message: "Category already exists" });

    const newCategory = new Category({ categoryName });
    await newCategory.save();

    res.status(201).json({ message: "Category created successfully", category: newCategory });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get a single category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update category by ID
const updateCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { categoryName },
      { new: true }
    );

    if (!updatedCategory) return res.status(404).json({ message: "Category not found" });

    res.status(200).json({ message: "Category updated successfully", category: updatedCategory });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete category by ID
const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) return res.status(404).json({ message: "Category not found" });

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};



const checkCategoryDependencies = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the category is referenced in courses
    const courseExists = await Course.findOne({ category: id });
    const demoVideoExists = await DemoVideo.findOne({ category: id });

    if (courseExists || demoVideoExists) {
      return res.status(200).json({ hasDependencies: true });
    }

    return res.status(200).json({ hasDependencies: false });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  checkCategoryDependencies
};
