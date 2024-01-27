import React, { useEffect, useState } from 'react';
import Bird from './Bird';
import Pipe from './Pipe';

const GameArea = ({ backgroundColor, birdColor, obstacleColor }) => {
  const [birdStyle, setBirdStyle] = useState({ x: 100, y: 100 });
  const [obstacles, setObstacles] = useState([{ x: 300, upperHeight: 100, gap: 300 }]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(true);

  const jump = () => {
    if (gameActive) {
      setBirdStyle((prev) => ({ ...prev, y: prev.y - 40 }));
    }
  };

  const generateRandomHeight = () => {
    return Math.floor(Math.random() * 200) + 50;
  };

  const addObstacle = () => {
    const upperHeight = generateRandomHeight();
    setObstacles((prev) => [
      ...prev,
      { x: window.innerWidth, upperHeight, gap: 300 },
    ]);
  };

  const handleKeyPress = (e) => {
    if (e.key === ' ' || e.key === 'Spacebar') {
      jump();
    }
  };

  const startGame = () => {
    setBirdStyle({ x: 100, y: 100 });
    setObstacles([{ x: 300, upperHeight: 100, gap: 300 }]);
    setGameOver(false);
    setScore(0);
    setGameActive(true);
  };

  const endGame = () => {
    setGameOver(true);
    setGameActive(false);
  };

  const gameLoop = () => {
    if (birdStyle.y < window.innerHeight - 50) {
      setBirdStyle((prev) => ({ ...prev, y: prev.y + 3 }));
    }

    setObstacles((prev) =>
      prev.map((obstacle) => (obstacle.x > -50 ? { ...obstacle, x: obstacle.x - 7 } : { x: window.innerWidth, upperHeight: generateRandomHeight(), gap: 299 }))
    );

    if (obstacles.some(obstacle => (
      birdStyle.x + 50 > obstacle.x &&
      birdStyle.x < obstacle.x + 50 &&
      (birdStyle.y < obstacle.upperHeight || birdStyle.y + 50 > obstacle.upperHeight + obstacle.gap)
    ))) {
      endGame();
    }

    if (birdStyle.y > window.innerHeight || birdStyle.y < 0) {
      endGame();
    }

    if (birdStyle.y > window.innerHeight || birdStyle.y > 690){
      endGame();
    }

    if (gameActive) {
      setScore((prev) => {
        const passedObstacle = obstacles.find(obstacle => obstacle.x + 50 < birdStyle.x);
        if (passedObstacle) {
          return prev + 1;
        }
        return prev;
      });
    }
  };

  useEffect(() => {
    const gameInterval = setInterval(gameLoop, 20);
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      clearInterval(gameInterval);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [birdStyle, obstacles, gameActive]);

  useEffect(() => {
    if (gameActive) {
      const obstacleInterval = setInterval(addObstacle, 2500);
      return () => clearInterval(obstacleInterval);
    }
  }, [gameActive]);

  return (
    <div
      style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor }}
      onClick={jump}
    >
      <Bird birdStyle={{ ...birdStyle, backgroundColor: birdColor }} />
      {obstacles.map((obstacle, index) => (
        <Pipe key={index} pipeStyle={{ x: obstacle.x, y: 0, height: obstacle.upperHeight, backgroundColor: obstacleColor }} />
      ))}
      {obstacles.map((obstacle, index) => (
        <Pipe key={index + obstacles.length} pipeStyle={{ x: obstacle.x, y: obstacle.upperHeight + obstacle.gap, height: window.innerHeight - obstacle.upperHeight - obstacle.gap, backgroundColor: obstacleColor }} />
      ))}
      {gameOver && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', textAlign: 'center' }}>
          <div>Game Over</div>
          <div>Your Score: {score}</div>
          <button onClick={startGame} style={{ marginTop: '20px', padding: '10px', fontSize: '16px' }}>Play Again</button>
        </div>
      )}
      <div style={{ position: 'absolute', top: 10, left: 10, color: 'white', fontSize: '20px' }}>Score: {score}</div>
    </div>
  );
};

export default GameArea;