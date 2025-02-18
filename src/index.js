const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const roleRoutes = require('./routes/roleRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json()); // Middleware to parse JSON requests
app.use(cors()); // Middleware for cross-origin requests

// Connect to MongoDB
connectDB();

// Example route to test the server
app.get('/', (req, res) => {
  res.send('Course Selling Backend');
});

// Use Role Routes
app.use('/api', roleRoutes);
app.use('/api/auth', authRoutes);  // Add auth routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
