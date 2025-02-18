const mongoose = require('mongoose');
const Joi = require('joi');
const { hashPassword } = require('../config/bcrypt');

// Define the Role Schema
const roleSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: (v) => /\S+@\S+\.\S+/.test(v), // Basic email validation
      message: 'Please enter a valid email',
    },
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['master admin', 'admin'],
    required: true,
  },
});

// Pre-save hook to encrypt password before saving
// roleSchema.pre('save', async function (next) {
//   if (this.isModified('password')) {
//     this.password = await hashPassword(this.password); // Hash the password
//   }
//   next();
// });

// Validation schema using Joi
const validateRole = (role) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('master admin', 'admin').required(),
  });
  return schema.validate(role);
};

// Create the Role model
const Role = mongoose.model('Role', roleSchema);

module.exports = { Role, validateRole };
