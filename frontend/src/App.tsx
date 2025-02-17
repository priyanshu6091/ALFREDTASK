import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import FlashcardList from './components/FlashcardList';
import AddFlashcard from './components/AddFlashcard';
import Login from './components/Login';
import Signup from './components/Signup';
import PrivateRoute from './components/PrivateRoute';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const AppContent: React.FC = () => {
  const [showAdd, setShowAdd] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate(); // Add this line

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow transition-colors duration-200`}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Flashcard Learning App</h1>
            <div className="flex items-center gap-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
              >
                {darkMode ? '🌙' : '☀️'}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/add-flashcard')} // Update this line
                className={`px-4 py-2 rounded ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition`}
              >
                Add New Card
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <FlashcardList />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <AppContent />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-flashcard"
            element={
              <PrivateRoute>
                <AddFlashcard />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;