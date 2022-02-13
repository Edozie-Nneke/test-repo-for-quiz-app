import React from 'react';
import { Link } from 'react-router-dom';
import './score.css';

export default function Score({ myScore, lengthOfQuiz }) {
  const handleBackToStart = () => {};
  return (
    <div className='score-wrapper'>
      {myScore <= 5 ? (
        <div className='progress-bar'>
          <>
            <iframe
              src='https://giphy.com/embed/MWs9L7oKYg8I1GoJtE'
              title='jsx-a11y/iframe-has-title'
              width='350'
              height='300'
              frameBorder='0'
              className='giphy-embed'
              allowFullScreen
            ></iframe>
          </>
        </div>
      ) : (
        <div className='progress-bar'>
          <>
            <iframe
              src='https://giphy.com/embed/fDbzXb6Cv5L56'
              title='jsx-a11y/iframe-has-title'
              width='350'
              height='300'
              frameBorder='0'
              class='giphy-embed'
              allowFullScreen
            ></iframe>
          </>
        </div>
      )}
      <section className='score'>
        <h2>
          You scored:{' '}
          <span>
            {myScore} out of {lengthOfQuiz}
          </span>
        </h2>
        <p>Thank you for playing.</p>
      </section>
      <div className='score-btn-wrapper'>
        <Link to='/startpage'>
          <button onClick={() => handleBackToStart}>Play again?</button>
        </Link>
      </div>
    </div>
  );
}
