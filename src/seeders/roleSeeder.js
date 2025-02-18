const { Role } = require('../models/Role');
const { hashPassword } = require('../config/bcrypt'); // Import password hashing function

// Create initial roles
const createInitialRoles = async () => {
  const roles = [
    { email: 'pirhotech@gmail.com', password: 'systemError', role: 'master admin' },
    { email: 'milton@gmail.com', password: 'systemError2', role: 'admin' },
  ];

  try {
    for (let role of roles) {
      const { email, password, role: userRole } = role;

      // Check if the role already exists
      const existingRole = await Role.findOne({ email });
      if (!existingRole) {
        const hashedPassword = await hashPassword(password); // Hash password
        const newRole = new Role({ email, password: hashedPassword, role: userRole });
        await newRole.save();
        console.log(`Role created for ${email}`);
      } else {
        console.log(`Role already exists for ${email}`);
      }
    }

    console.log('Role seeding completed');
    process.exit(); // Exit after the seeding is done
  } catch (error) {
    console.error('Error seeding roles:', error);
    process.exit(1);
  }
};

createInitialRoles();
