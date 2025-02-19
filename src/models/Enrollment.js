const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  transactionId: { type: String, required: true, unique: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  isActive: { type: Boolean, default: false }, // Activated upon approval
}, { timestamps: true });

module.exports = mongoose.model('Enrollment', EnrollmentSchema);
