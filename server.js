const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes'); // Importing routes from the routes folder

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the routes you set up
app.use('/api', routes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialnetwork', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Log Mongo queries being executed
mongoose.set('debug', true);

// Start the server
app.listen(PORT, () => {
  console.log(`🌍 Server running on http://localhost:${PORT}`);
});