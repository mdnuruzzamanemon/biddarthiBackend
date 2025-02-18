const bcrypt = require('bcryptjs');
const { Role, validateRole } = require('../models/Role');

// Controller to create a new role
const createRole = async (req, res) => {
  const { error } = validateRole(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { email, password, role } = req.body;

  try {
    // Check if the role already exists
    const existingRole = await Role.findOne({ email });
    if (existingRole) return res.status(400).json({ message: 'Role with this email already exists' });

    // Hash the password directly using bcrypt
    const salt = await bcrypt.genSalt(10);  // Generate salt
    const hashedPassword = await bcrypt.hash(password, salt);  // Hash the password with the salt

    // Create a new role with the hashed password
    const newRole = new Role({ email, password: hashedPassword, role });
    await newRole.save();

    res.status(201).json({ message: 'Role created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createRole };
