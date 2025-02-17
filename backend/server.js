const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/flashcard-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
const flashcardRoutes = require('./routes/flashcardRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api', flashcardRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
