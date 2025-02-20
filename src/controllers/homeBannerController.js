const fs = require('fs');
const path = require('path');
const HomeBanner = require('../models/HomeBanner');

// Function to delete old image file
const deleteFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

// @desc Upload Home Banner Image (Replaces Existing)
exports.uploadBanner = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Image is required' });

    // Check if there's already a banner image
    const existingBanner = await HomeBanner.findOne();

    if (existingBanner) {
      deleteFile(existingBanner.image); // Delete the old image file
      existingBanner.image = req.file.path;
      await existingBanner.save();
      return res.status(200).json({ message: 'Home banner updated', banner: existingBanner });
    }

    // If no banner exists, create a new one
    const newBanner = new HomeBanner({ image: req.file.path });
    await newBanner.save();

    res.status(201).json({ message: 'Home banner uploaded', banner: newBanner });
  } catch (error) {
    if (req.file) deleteFile(req.file.path); // Delete uploaded file if error occurs
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc Get Home Banner Image
exports.getBanner = async (req, res) => {
  try {
    const banner = await HomeBanner.findOne();
    if (!banner) return res.status(404).json({ message: 'No banner image found' });

    res.status(200).json(banner);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc Delete Home Banner Image
exports.deleteBanner = async (req, res) => {
  try {
    const banner = await HomeBanner.findOne();
    if (!banner) return res.status(404).json({ message: 'No banner image found' });

    deleteFile(banner.image); // Remove file
    await HomeBanner.deleteOne(); // Remove document from database

    res.status(200).json({ message: 'Home banner deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
