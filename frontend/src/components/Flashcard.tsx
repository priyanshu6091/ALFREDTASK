import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FlashcardProps {
  question: string;
  answer: string;
  reviewHistory: Array<{
    date: string;
    wasCorrect: boolean;
    fromBox: number;
    toBox: number;
  }>;
  onAnswer: (correct: boolean) => void;
}

const Flashcard: React.FC<FlashcardProps> = ({
  question,
  answer,
  reviewHistory,
  onAnswer
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => setIsFlipped(!isFlipped);

  return (
    <div className="max-w-md mx-auto mt-8">
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 cursor-pointer"
        onClick={handleFlip}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {!isFlipped ? (
          <>
            <h2 className="text-xl font-semibold mb-4">Question</h2>
            <p className="text-gray-700">{question}</p>
            <button
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition mt-4"
              onClick={handleFlip}
            >
              Show Answer
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">Answer</h2>
            <p className="text-gray-700">{answer}</p>
            <div className="mt-4">
              <h3 className="text-sm font-semibold">Review History</h3>
              <div className="text-xs space-y-1 mt-2">
                {reviewHistory.map((entry, index) => {
                  const formattedDate = new Date(entry.date).toLocaleDateString();
                  return (
                    <div key={index} className="flex items-center">
                      <span className="w-8 text-right">{formattedDate}</span>
                      <span className="flex-1">
                        {entry.wasCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                      <span className="w-12 text-right">
                        {`Box ${entry.fromBox} → ${entry.toBox}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                onClick={() => onAnswer(false)}
              >
                Incorrect
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition ml-2"
                onClick={() => onAnswer(true)}
              >
                Correct
              </motion.button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Flashcard;