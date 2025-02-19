const fs = require('fs');
const path = require('path');
const Course = require('../models/Course');
const Category = require('../models/Category');

// Function to delete file
const deleteFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

// @desc Create Course
exports.createCourse = async (req, res) => {
  try {
    const { title, category, price, discountPrice, description, instructor, discountEndsAt, demoVideo } = req.body;

    if (!req.file) return res.status(400).json({ message: 'Thumbnail is required' });

    // Validate category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      deleteFile(req.file.path); // Delete the uploaded file if category is invalid
      return res.status(400).json({ message: 'Invalid category' });
    }

    const newCourse = new Course({
      title,
      thumbnail: req.file.path,
      category,
      price,
      discountPrice,
      description,
      instructor,
      discountEndsAt,
      demoVideo,
    });

    await newCourse.save();
    res.status(201).json({ message: 'Course created successfully', course: newCourse });
  } catch (err) {
    if (req.file) deleteFile(req.file.path); // Delete the uploaded file if an error occurs
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc Get all Courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('category', 'categoryName');
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc Get Course by ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('category', 'categoryName');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc Update Course
exports.updateCourse = async (req, res) => {
  try {
    const { title, category, price, discountPrice, description, instructor, discountEndsAt, demoVideo } = req.body;

    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    if (req.file) {
      // Delete old thumbnail before updating
      deleteFile(course.thumbnail);
      course.thumbnail = req.file.path;
    }

    course.title = title;
    course.category = category;
    course.price = price;
    course.discountPrice = discountPrice;
    course.description = description;
    course.instructor = instructor;
    course.discountEndsAt = discountEndsAt;
    course.demoVideo = demoVideo;

    await course.save();
    res.status(200).json({ message: 'Course updated successfully', course });
  } catch (err) {
    if (req.file) deleteFile(req.file.path); // Delete uploaded file if update fails
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc Delete Course
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // Delete the associated thumbnail file
    deleteFile(course.thumbnail);

    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
