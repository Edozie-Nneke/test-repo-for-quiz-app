import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './startPage.css';
import logo from '../../assets/cta-logo.png';
import avatarImg from '../../assets/avatar.jpg';

export default function StartPage({
  handleCategoryChange,
  handleDifficultyChange,
  difficulty,
  category,
}) {
  const queryParams = new URLSearchParams(window.location.search);
  const name = queryParams.get('name');
  const avatar = queryParams.get('avatar');
  const accessToken = queryParams.get('accessToken');

  useEffect(() => {
    localStorage.setItem('accessToken', accessToken);
  }, [accessToken]);

  return (
    <div className='startpage-container'>
      <section className='startpage-wrapper'>
        <header>
          <img src={logo} alt='logo' />
          <h1>Welcome to Cashtoken quiz app</h1>
          <div className='profile'>
            <span>{name}</span>
            {name && <button>Logout</button>}
            <img src={avatar || avatarImg} alt='avatar' />
          </div>
        </header>
        <div className='startpage-settings-wrapper'>
          <div className='random'>
            <h2>Rules</h2>
            <ul>
              <li>
                This a timed quiz. You have 10 minutes to complete 10 questions.
              </li>
              <li>
                Select the question type you wish to answer. If none is
                selected, questions will be polled at random from more than 6
                different categories{' '}
              </li>
              <li>
                Select from 3 different difficulty levels: Easy, Medium and Hard
              </li>
              <li>
                When you are done with your prefferd settings, click on the
                "Start quiz" button to start the quiz
              </li>
              <li>
                At the end of the quiz, your result will be displayed.{' '}
                <b>
                  Please note that the quiz will be terminated when the timer on
                  the right of your screen runs down and your result displayed!
                </b>
              </li>
            </ul>
          </div>
        </div>
        <form className='settings'>
          <div className='settings-wrapper'>
            <div className='difficulty'>
              <label>
                Select a "difficulty" level:
                <br />
                <select
                  className='select'
                  value={difficulty}
                  onChange={handleDifficultyChange}
                >
                  <option value='Random'>Random</option>
                  <option value='Easy'>Easy</option>
                  <option value='Medium'>Medium</option>
                  <option value='Hard'>Hard</option>
                </select>
              </label>
            </div>
            <div className='category'>
              <label>
                Select a question "category":
                <br />
                <select
                  className='select'
                  value={category}
                  onChange={handleCategoryChange}
                >
                  <option value='Random'>Random</option>
                  <option value='Linux'>Linux</option>
                  <option value='Cloud'>Cloud</option>
                  <option value='Docker'>Docker</option>
                  <option value='DevOps'>DevOps</option>
                  <option value='Networking'>Networking</option>
                  <option value='Programming'>
                    Programming (PHP, JS, Pythong and etc.)
                  </option>
                  <option value='Kubernetes'>Kubernetes</option>
                </select>
              </label>
            </div>
          </div>
          <div className='startpage-btn-wrapper'>
            <h4>Good luck!</h4>
            <Link to='/questions'>
              <button>Start quiz</button>
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}
