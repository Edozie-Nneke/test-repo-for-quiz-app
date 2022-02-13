import React from 'react';
import image from '../../assets/snap-logo.png';
import './home.css';

export default function Home() {
  return (
    <div className='home'>
      <div className='home-wrapper'>
        <p>Oops!, You are not logged in</p>
        <a href='http://localhost:3000/auth/snapchat'>
          <div className='snap-logo-btn'>
            <div className='logo-img'>
              <img src={image} alt='snap-logo' />
            </div>
            <div className='snap-btn'>Continue with Snapchat</div>
          </div>
        </a>
      </div>
    </div>
  );
}
