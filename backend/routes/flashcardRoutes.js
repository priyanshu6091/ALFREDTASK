const express = require('express');
const router = express.Router();
const Flashcard = require('../models/Flashcard');

const BOX_INTERVALS = {
  1: 1,
  2: 2,
  3: 4,
  4: 8,
  5: 16
};

router.get('/flashcards', async (req, res) => {
  try {
    const query = req.query.due === 'true' 
      ? { nextReviewDate: { $lte: new Date() } }
      : {};
    const flashcards = await Flashcard.find(query)
      .sort({ nextReviewDate: 1 });
    res.json(flashcards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/flashcards/stats', async (req, res) => {
  try {
    const stats = await Flashcard.aggregate([
      { $group: { _id: '$boxNumber', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    res.json(stats.reduce((acc, stat) => ({
      ...acc,
      [stat._id]: stat.count
    }), {}));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/flashcards', async (req, res) => {
  const flashcard = new Flashcard({
    question: req.body.question,
    answer: req.body.answer,
    reviewHistory: []
  });
  try {
    const newFlashcard = await flashcard.save();
    res.status(201).json(newFlashcard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/flashcards/:id', async (req, res) => {
  try {
    const flashcard = await Flashcard.findById(req.params.id);
    if (!flashcard) return res.status(404).json({ message: 'Not found' });

    const { isCorrect } = req.body;
    const originalBox = flashcard.boxNumber;

    if (isCorrect) {
      flashcard.boxNumber = Math.min(flashcard.boxNumber + 1, 5);
    } else {
      flashcard.boxNumber = 1;
    }

    const interval = BOX_INTERVALS[flashcard.boxNumber];
    flashcard.nextReviewDate = new Date(Date.now() + interval * 86400000);
    flashcard.lastReviewed = new Date();
    flashcard.reviewHistory.push({
      date: flashcard.lastReviewed,
      wasCorrect,
      fromBox: originalBox,
      toBox: flashcard.boxNumber
    });

    const updated = await flashcard.save();
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/flashcards/:id', async (req, res) => {
  try {
    const flashcard = await Flashcard.findById(req.params.id);
    if (!flashcard) return res.status(404).json({ message: 'Not found' });
    await flashcard.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;