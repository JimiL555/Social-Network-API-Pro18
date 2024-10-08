const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/api/userRoutes');
const thoughtRoutes = require('./routes/api/thoughtRoutes');

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the routes for users and thoughts
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialnetwork', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Enable debug mode to log MongoDB queries in the terminal
mongoose.set('debug', true);

// Start the server
app.listen(PORT, () => {
  console.log(`🌍 Server running on http://localhost:${PORT}`);
});