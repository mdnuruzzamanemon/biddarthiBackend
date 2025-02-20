const DemoVideo = require('../models/DemoVideo');
const Category = require('../models/Category');

// @desc Create a Demo Video
exports.createDemoVideo = async (req, res) => {
  try {
    const { title, videoLink, category, instructor } = req.body;

    // Validate category existence
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    const newDemoVideo = new DemoVideo({ title, videoLink, category, instructor });
    await newDemoVideo.save();

    res.status(201).json({ message: 'Demo video added successfully', demoVideo: newDemoVideo });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc Get All Demo Videos
exports.getDemoVideos = async (req, res) => {
  try {
    const demoVideos = await DemoVideo.find().populate('category', 'categoryName');
    res.status(200).json(demoVideos);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc Get a Single Demo Video by ID
exports.getDemoVideoById = async (req, res) => {
  try {
    const demoVideo = await DemoVideo.findById(req.params.id).populate('category', 'categoryName');
    if (!demoVideo) return res.status(404).json({ message: 'Demo video not found' });

    res.status(200).json(demoVideo);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc Update a Demo Video
exports.updateDemoVideo = async (req, res) => {
  try {
    const { title, videoLink, category, instructor } = req.body;

    // Validate category existence
    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(400).json({ message: 'Invalid category' });
      }
    }

    const updatedDemoVideo = await DemoVideo.findByIdAndUpdate(
      req.params.id,
      { title, videoLink, category, instructor },
      { new: true }
    );

    if (!updatedDemoVideo) return res.status(404).json({ message: 'Demo video not found' });

    res.status(200).json({ message: 'Demo video updated successfully', demoVideo: updatedDemoVideo });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc Delete a Demo Video
exports.deleteDemoVideo = async (req, res) => {
  try {
    const deletedDemoVideo = await DemoVideo.findByIdAndDelete(req.params.id);
    if (!deletedDemoVideo) return res.status(404).json({ message: 'Demo video not found' });

    res.status(200).json({ message: 'Demo video deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
