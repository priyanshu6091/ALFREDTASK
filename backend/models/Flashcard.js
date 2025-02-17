const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  boxNumber: {
    type: Number,
    default: 1,
    min: 1,
    max: 5,
  },
  nextReviewDate: {
    type: Date,
    default: Date.now,
  },
  lastReviewed: {
    type: Date,
    default: null,
  },
  reviewHistory: [{
    date: {
      type: Date,
      default: Date.now,
    },
    wasCorrect: Boolean,
    fromBox: Number,
    toBox: Number,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Flashcard', flashcardSchema);
