import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Flashcard from './Flashcard';

interface IFlashcard {
  _id: string;
  question: string;
  answer: string;
  boxNumber: number;
  nextReviewDate: string;
  lastReviewed: string | null;
  reviewHistory: Array<{
    date: string;
    wasCorrect: boolean;
    fromBox: number;
    toBox: number;
  }>;
}

interface BoxStats {
  [key: number]: number;
}

type BoxNumber = 1 | 2 | 3 | 4 | 5;

const BOX_DESCRIPTIONS: Record<BoxNumber, string> = {
  1: 'Daily Review',
  2: 'Every 2 Days',
  3: 'Every 4 Days',
  4: 'Every 8 Days',
  5: 'Every 16 Days',
};

const BOXES: BoxNumber[] = [1, 2, 3, 4, 5];

const FlashcardList: React.FC = () => {
  const [flashcards, setFlashcards] = useState<IFlashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [boxStats, setBoxStats] = useState<BoxStats>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFlashcardsAndStats();
  }, []);

  const fetchFlashcardsAndStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const [cardsResponse, statsResponse] = await Promise.all([
        axios.get('http://localhost:5000/api/flashcards?due=true'),
        axios.get('http://localhost:5000/api/flashcards/stats')
      ]);
      
      setFlashcards(cardsResponse.data);
      setBoxStats(statsResponse.data);
      setCurrentIndex(0);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load flashcards. Please try again later.');
      setLoading(false);
    }
  };

  const handleAnswer = async (correct: boolean) => {
    if (flashcards.length === 0) return;

    try {
      await axios.put(`http://localhost:5000/api/flashcards/${flashcards[currentIndex]._id}`, {
        isCorrect: correct
      });
      
      await fetchFlashcardsAndStats();
    } catch (error) {
      console.error('Error updating flashcard:', error);
      setError('Failed to update flashcard. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="text-xl text-red-600">{error}</div>
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={fetchFlashcardsAndStats}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Leitner System Boxes</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {BOXES.map((boxNum) => (
            <div
              key={boxNum}
              className="bg-white rounded-lg shadow p-4 border-l-4"
              style={{
                borderLeftColor: `hsl(${(boxNum - 1) * 30}, 70%, 50%)`,
                color: '#000'
              }}
            >
              <h3 className="text-lg font-medium">Box {boxNum}</h3>
              <p className="text-sm text-gray-600">{BOX_DESCRIPTIONS[boxNum]}</p>
              <p className="text-2xl font-bold mt-2">{boxStats[boxNum] || 0}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {flashcards.length > 0 
            ? `Study Session (${currentIndex + 1}/${flashcards.length})` 
            : 'No Cards Due'
          }
        </h2>
        {flashcards.length > 0 ? (
          <Flashcard
            question={flashcards[currentIndex].question}
            answer={flashcards[currentIndex].answer}
            reviewHistory={flashcards[currentIndex].reviewHistory}
            onAnswer={handleAnswer}
          />
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <p className="text-xl text-green-800">
              Great job! No cards due for review.
            </p>
            <p className="text-sm text-green-600 mt-2">
              Add new cards or check back later.
            </p>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={() => navigate('/add-flashcard')}
            >
              Add New Card
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashcardList;