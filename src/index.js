const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Import routes
const sessionRoutes = require('./routes/sessionRoutes');
const trackingRoutes = require('./routes/trackingRoutes');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware allow all CORS requests
app.use(cors());
app.use(express.json());

// Welcome route
app.get('/welcome', (req, res) => {
  res.json({
    message: 'Welcome to the Tracking API',
    status: 'online',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/sessions', sessionRoutes);
app.use('/tracking', trackingRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('Tracking API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
