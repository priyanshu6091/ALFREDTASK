import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FlashcardProps {
  question: string;
  answer: string;
  onAnswer: (correct: boolean) => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ question, answer, onAnswer }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAnswer = (correct: boolean) => {
    onAnswer(correct);
    setIsFlipped(false);
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 cursor-pointer min-h-[200px] flex flex-col justify-between"
        onClick={handleFlip}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">
            {isFlipped ? 'Answer' : 'Question'}
          </h2>
          <p className="text-gray-700">
            {isFlipped ? answer : question}
          </p>
        </div>
        <div className="mt-6 flex flex-col gap-3">
          {!isFlipped ? (
            <button
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
              onClick={handleFlip}
            >
              Show Answer
            </button>
          ) : (
            <div className="flex gap-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                onClick={() => handleAnswer(false)}
              >
                Got it Wrong
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                onClick={() => handleAnswer(true)}
              >
                Got it Right
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Flashcard;
