import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './questions.css';
import Score from '../score/Score';
import CountdownTimer from '../countdownTimer/CountdownTimer';

export default function Questions({ categoryLevel, difficultyLevel }) {
  const [quiz, setQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleTimeElapsed = dataFromTimer => {
    setShowScore(dataFromTimer);
  };

  const handleAnswerClick = choosenAnswer => {
    if (choosenAnswer === quiz[currentQuestion].correct_answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion <= quiz.length - 1) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      handleTimeElapsed(true);
    }
  };

  let category = categoryLevel === 'Random' ? '' : categoryLevel;
  let difficulty = difficultyLevel === 'Random' ? '' : difficultyLevel;

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.get(
        `https://quizapi.io/api/v1/questions?category=${category}&difficulty=${difficulty}&limit=10`,
        {
          headers: {
            'X-Api-Key': '4mVQvLEPJd6R2K8EQfs00KjmDhYhBHcp8wSSSU9Z',
          },
        }
      );

      const result = await response.data;

      setQuiz(result);
    };

    fetchQuestions();
  }, [category, difficulty]);

  return (
    <div className='question-container'>
      {showScore ? (
        <Score myScore={score} lengthOfQuiz={quiz.length} />
      ) : !quiz.length ? (
        <h1>Please wait...</h1>
      ) : (
        <div className='question-wrapper'>
          <CountdownTimer onTimeElapsed={handleTimeElapsed} />
          <>
            <div className='question'>
              <div>
                <span>Category:</span> <p>{quiz[currentQuestion].category}</p>
              </div>
              {quiz[currentQuestion].question}
            </div>
            <div className='answers-container'>
              {quiz[currentQuestion].answers.answer_a && (
                <div
                  className='answer'
                  onClick={() => handleAnswerClick('answer_a')}
                >
                  {quiz[currentQuestion].answers.answer_a}
                </div>
              )}

              {quiz[currentQuestion].answers.answer_b && (
                <div
                  className='answer'
                  onClick={() => handleAnswerClick('answer_b')}
                >
                  {quiz[currentQuestion].answers.answer_b}
                </div>
              )}

              {quiz[currentQuestion].answers.answer_c && (
                <div
                  className='answer'
                  onClick={() => handleAnswerClick('answer_c')}
                >
                  {!quiz[currentQuestion].answers.answer_c}
                </div>
              )}

              {quiz[currentQuestion].answers.answer_d && (
                <div
                  className='answer'
                  onClick={() => handleAnswerClick('answer_d')}
                >
                  {quiz[currentQuestion].answers.answer_d}
                </div>
              )}

              {quiz[currentQuestion].answers.answer_e && (
                <div
                  className='answer'
                  onClick={() => handleAnswerClick('answer_e_correct')}
                >
                  {quiz[currentQuestion].answers.answer_e}
                </div>
              )}

              {quiz[currentQuestion].answers.answer_f && (
                <div
                  className='answer'
                  onClick={() => handleAnswerClick('answer_f_correct')}
                >
                  {quiz[currentQuestion].answers.answer_f}
                </div>
              )}
            </div>
          </>
        </div>
      )}
    </div>
  );
}
