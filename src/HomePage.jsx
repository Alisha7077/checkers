import React, { useState } from 'react';
import GameArea from './GameArea';
import './HomePage.css'

const HomePage = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {!gameStarted ? (
        <>
          <h1>Welcome Flappy Bird</h1>
          <button onClick={startGame}>Play</button>
        </>
      ) : (
        <GameArea/>
      )}
    </div>
  );
};

export default HomePage;
