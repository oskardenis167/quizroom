import React, { useState } from 'react';
import '../styles/game.scss';
import Menu from './Menu';
import Quiz from './Quiz';
import { EModes } from './Enums/EModes';

const Game = () => {
  const [gameState, setGameState] = useState(EModes.init); // zmienic na init
  const [questionNumber, setQuestionNumber] = useState(0);
  const [questionsCount, setQuestionsCount] = useState(10);
  const [category, setCategory] = useState('');

  const gameMode = (gameState: string) => {
    switch (gameState) {
      case EModes.init:
        if (questionNumber !== 0) setQuestionNumber(0);
        return (
          <Menu
            setGameState={setGameState}
            mode={EModes.init}
            questionsCount={questionsCount}
            setQuestionsCount={setQuestionsCount}
          />
        );
      // case EModes.paused:
      //   return <Menu setGameState={setGameState} mode={EModes.paused} />;
      case EModes.play:
        return (
          <Quiz
            setGameState={setGameState}
            mode={EModes.play}
            questionNumber={questionNumber}
            setQuestionNumber={setQuestionNumber}
            questionsCount={questionsCount}
          />
        );
      default:
        console.log('error mode');
        throw Error('error mode');
    }
  };

  return <>{gameMode(gameState)}</>;
};

export default Game;
