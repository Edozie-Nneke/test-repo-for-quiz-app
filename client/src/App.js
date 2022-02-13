import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Questions from './components/questions/Questions';
import StartPage from './components/startPage/StartPage';
import Home from './components/home/Home';

export default function App() {
  const [difficulty, setDifficulty] = useState('');
  const [category, setCategory] = useState('');

  const handleDifficultyChange = event => {
    setDifficulty(event.target.value);
  };

  const handleCategoryChange = event => {
    setCategory(event.target.value);
  };

  const startQuiz = e => {
    e.preventDefault();
    console.log(difficulty, category);
  };

  return (
    <div style={appStyle}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/startpage'
            element={
              <StartPage
                handleDifficultyChange={handleDifficultyChange}
                handleCategoryChange={handleCategoryChange}
                startQuiz={startQuiz}
              />
            }
          />
          <Route
            path='/questions'
            element={
              <Questions
                difficultyLevel={difficulty}
                categoryLevel={category}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const appStyle = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#f3f3f3',
};
