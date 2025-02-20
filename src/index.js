const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const roleRoutes = require('./routes/roleRoutes');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const courseRoutes = require('./routes/courseRoutes');
const trendingRoutes = require('./routes/trendingRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const demoVideoRoutes = require('./routes/demoVideoRoutes');
const homeBannerRoutes = require('./routes/homeBannerRoutes');



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

// Routes
app.use('/api', roleRoutes); //role routes
app.use('/api/auth', authRoutes);  // Add auth routes
app.use('/api/categories', categoryRoutes); // Register category routes
app.use('/uploads', express.static('uploads')); // Serve uploaded files
app.use('/api/courses', courseRoutes);
app.use('/api/trending', trendingRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/demovideos', demoVideoRoutes);
app.use('/api/homebanner', homeBannerRoutes);



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
