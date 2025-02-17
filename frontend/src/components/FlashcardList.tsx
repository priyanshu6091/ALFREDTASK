import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Flashcard from './Flashcard';

interface IFlashcard {
  _id: string;
  question: string;
  answer: string;
  boxNumber: number;
  nextReviewDate: string;
  lastReviewed: string | null;
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

  useEffect(() => {
    fetchFlashcardsAndStats();
  }, []);

  const fetchFlashcardsAndStats = async () => {
    try {
      setLoading(true);
      const [cardsResponse, statsResponse] = await Promise.all([
        axios.get('http://localhost:5000/api/flashcards?due=true'),
        axios.get('http://localhost:5000/api/flashcards/stats')
      ]);
      
      setFlashcards(cardsResponse.data);
      setBoxStats(statsResponse.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleAnswer = async (correct: boolean) => {
    if (flashcards.length === 0) return;

    const currentCard = flashcards[currentIndex];
    try {
      await axios.put(`http://localhost:5000/api/flashcards/${currentCard._id}`, {
        isCorrect: correct
      });
      
      // Move to next card or refresh the list if we're at the end
      if (currentIndex < flashcards.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        await fetchFlashcardsAndStats();
        setCurrentIndex(0);
      }
    } catch (error) {
      console.error('Error updating flashcard:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Box Statistics */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Leitner System Boxes</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {BOXES.map((boxNum) => (
            <div
              key={boxNum}
              className="bg-white rounded-lg shadow p-4 border-l-4"
              style={{
                borderLeftColor: `hsl(${(boxNum - 1) * 30}, 70%, 50%)`,
                color: '#000' // Set a fixed text color
              }}
            >
              <h3 className="text-lg font-medium">Box {boxNum}</h3>
              <p className="text-sm text-gray-600">{BOX_DESCRIPTIONS[boxNum]}</p>
              <p className="text-2xl font-bold mt-2">{boxStats[boxNum] || 0}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Current Study Session */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Study Session</h2>
        {flashcards.length > 0 ? (
          <div>
            <div className="text-sm text-gray-600 mb-4">
              Card {currentIndex + 1} of {flashcards.length} due today
            </div>
            <Flashcard
              question={flashcards[currentIndex].question}
              answer={flashcards[currentIndex].answer}
              onAnswer={handleAnswer}
            />
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <p className="text-xl text-green-800">
              Great job! No cards due for review.
            </p>
            <p className="text-sm text-green-600 mt-2">
              Check back later for more cards to review.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashcardList;
