import React, { useState } from 'react';
import '../styles/game.scss';
import Menu from './Menu';
import Quiz from './Quiz';

const Game = () => {
  const [gameState, setGameState] = useState('xx'); // zmienic na init

  return (
    <>
      {gameState === 'paused' || gameState === 'init' ? (
        <Menu setGameState={setGameState} />
      ) : (
        <Quiz />
      )}
    </>
  );
};

export default Game;
