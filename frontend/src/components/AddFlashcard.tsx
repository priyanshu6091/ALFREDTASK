import React, { useState } from 'react';
import axios from 'axios';

interface AddFlashcardProps {
  onFlashcardAdded?: () => void;
}

const AddFlashcard: React.FC<AddFlashcardProps> = ({ onFlashcardAdded }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await axios.post('http://localhost:5000/api/flashcards', {
        question,
        answer,
      });
      
      setQuestion('');
      setAnswer('');
      if (onFlashcardAdded) onFlashcardAdded();
    } catch (error) {
      console.error('Error adding flashcard:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Flashcard</h2>
        
        <div className="mb-4">
          <label htmlFor="question" className="block text-gray-700 mb-2">
            Question
          </label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="answer" className="block text-gray-700 mb-2">
            Answer
          </label>
          <textarea
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Add Flashcard
        </button>
      </form>
    </div>
  );
};

export default AddFlashcard;