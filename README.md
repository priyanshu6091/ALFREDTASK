# Flashcard Learning App

## LICENSE
This project is licensed under the MIT License - see the LICENSE file for details.

## Description
This is a full-stack web application for managing flashcards using the Leitner System. It features a MongoDB backend with Express.js and a React frontend.

## Features
- **Leitner System Implementation**
  - Automatic review scheduling
  - Multiple review boxes with increasing intervals
- **User Authentication**
  - Registration
  - Login
  - Password reset
- **Flashcard Management**
  - Create
  - Read
  - Update
  - Delete
- **Responsive Design**
  - Mobile-friendly interface
  - Dark mode support
- **Statistics Tracking**
  - Box statistics
  - Review history

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) (v16 or later)
- [MongoDB](https://www.mongodb.com) (local or cloud instance)
- npm/yarn

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/priyanshu6091/ALFREDTASK.git
   ```
2. **Install dependencies**:
   ```bash
   cd flashcard-app
   npm install
   cd frontend
   npm install
   ```
3. **Set up environment variables**:
   - Create `.env` files in both backend and frontend directories
     
   **Backend (`.env`)**:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/flashcard-app
   JWT_SECRET=your_jwt_secret
   ```
   **Frontend (`.env`)**:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start MongoDB**:
   ```bash
   sudo service mongod start
   ```

5. **Start the application**:
   - Backend:
     ```bash
     cd backend
     node server.js
     ```
   - Frontend (in another terminal):
     ```bash
     cd frontend
     npm start
     ```

### Usage
- Access the application at `http://localhost:3000`
- Register a new user
- Login to access flashcard management
- Add new flashcards through the interface
- Review flashcards according to the Leitner System schedule

## Project Structure
```plaintext
flashcard-app/
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── models/
│   │   ├── Flashcard.js
│   │   └── User.js
│   ├── routes/
│   │   ├── flashcardRoutes.js
│   │   └── userRoutes.js
│   └── middleware/
│       └── auth.js
├── frontend/
│   ├── package.json
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── App.tsx
│   │   ├── components/
│   │   │   ├── FlashcardList.tsx
│   │   │   └── AddFlashcard.tsx
│   │   └── contexts/
│   │       └── ThemeContext.tsx
└── README.md
```

## Contributing
1. Fork the repository
2. Create a new branch
3. Make your changes
4. Run tests
5. Submit a pull request

## Author
Priyanshu Galani  
[Your GitHub Profile](https://github.com/ALFREDTASK)
