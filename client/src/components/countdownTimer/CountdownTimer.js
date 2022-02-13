import React, { useState, useEffect } from 'react';
import './countdownTimer.css';

export default function CountdownTimer({ onTimeElapsed }) {
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [showMyScore, setShowMyScore] = useState(false);

  useEffect(() => {
    let interval, differenceInTime;

    const timerStart = () => {
      const allowedTime = 120000;

      const countdownTimeLength = new Date().getTime() + allowedTime;

      interval = setInterval(() => {
        const currentTime = new Date().getTime();

        differenceInTime = countdownTimeLength - currentTime;

        const minutes = Math.floor(
          (differenceInTime % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((differenceInTime % (1000 * 60)) / 1000);

        if (differenceInTime < 0) {
          clearInterval(interval.current);
        } else {
          setMinutes(minutes < 10 ? `0${minutes}` : minutes);
          setSeconds(seconds < 10 ? `0${seconds}` : seconds);

          if ((minutes === 0 && seconds === 0) || showMyScore === true) {
            setShowMyScore(true);
            onTimeElapsed(true);
          }
        }
      }, 1000);
    };

    timerStart();

    return () => {
      clearInterval(interval);
    };
  }, [onTimeElapsed, showMyScore]);

  return (
    <div className='countdownTimer'>
      <h2>Time left</h2>
      <div className='countdownTimer-wrapper'>
        <small>mins</small>
        <div className='minutes'>{minutes}</div>
        <div className='colon'>:</div>
        <div className='seconds'>{seconds}</div>
        <small>sec</small>
      </div>
    </div>
  );
}
