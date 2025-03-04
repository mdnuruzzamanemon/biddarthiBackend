const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const sendEmail = require('../utils/sendEmail');

// @desc Submit Enrollment Request (Public)
exports.enrollStudent = async (req, res) => {
  try {
    const { courseId, name, email, phone, transactionId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // Create enrollment request
    const enrollment = new Enrollment({ course: courseId, name, email, phone, transactionId });
    await enrollment.save();

    // Send submission email
    const emailContent = `
      <h2>Enrollment Submitted</h2>
      <p>Dear ${name},</p>
      <p>Your enrollment request for <b>${course.title}</b> has been submitted.</p>
      <p> Please join our telegram group using the link below for further instructions: <a href="https://t.me/+P7eho8F8mSM1NzU1">Click to Join</a></p>
    `;
    sendEmail(email, 'Enrollment Request Submitted', emailContent);

    res.status(201).json({ message: 'Enrollment request submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc Get All Enrollment Requests (Protected)
exports.getEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find().populate('course', 'title');
    res.status(200).json(enrollments);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc Approve Enrollment (Protected)
exports.approveEnrollment = async (req, res) => {
  try {
    const { id } = req.params;

    const enrollment = await Enrollment.findById(id);
    if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });

    enrollment.status = 'Approved';
    enrollment.isActive = true;
    await enrollment.save();

    // Send approval email
    const emailContent = `
      <h2>Enrollment Approved</h2>
      <p>Dear ${enrollment.name},</p>
      <p>Your enrollment for <b>${enrollment.course.title}</b> has been approved!</p>
      <p>Welcome aboard!</p>
    `;
    sendEmail(enrollment.email, 'Enrollment Approved', emailContent);

    res.status(200).json({ message: 'Enrollment approved successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc Reject Enrollment (Protected)
exports.rejectEnrollment = async (req, res) => {
  try {
    const { id } = req.params;

    const enrollment = await Enrollment.findById(id);
    if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });

    enrollment.status = 'Rejected';
    enrollment.isActive = false;
    await enrollment.save();

    // Send rejection email
    const emailContent = `
      <h2>Enrollment Rejected</h2>
      <p>Dear ${enrollment.name},</p>
      <p>Unfortunately, your enrollment for <b>${enrollment.course.title}</b> has been rejected.</p>
      <p>Please contact support for further assistance.</p>
    `;
    sendEmail(enrollment.email, 'Enrollment Rejected', emailContent);

    res.status(200).json({ message: 'Enrollment rejected successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc Delete Enrollment (Protected)
exports.deleteEnrollment = async (req, res) => {
  try {
    const { id } = req.params;

    const enrollment = await Enrollment.findByIdAndDelete(id);
    if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });

    res.status(200).json({ message: 'Enrollment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc Get Enrollment Count for a Course (Public)
exports.getEnrollmentCount = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Count enrollments for the given course ID
    const count = await Enrollment.countDocuments({ course: courseId });

    res.status(200).json({ courseId, enrollmentCount: count });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
