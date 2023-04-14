// NODE MODULES
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// COMPONENTS
import Menu from './Menu';
import Quiz from './Quiz';
import { EModes } from './Enums/EModes';
import ICategoryResponse from './Interfaces/ICategoryResponse';
import { useAPI, TApiResponse } from './hooks/useAPI';
import Loading from './Loading';

// STYLES
import '../styles/game.scss';

const Game = () => {
  const [gameState, setGameState] = useState(EModes.init); // zmienic na init
  const [questionNumber, setQuestionNumber] = useState(0);
  const [questionsCount, setQuestionsCount] = useState(10);

  const categoryAPI = 'https://opentdb.com/api_category.php';
  const data: TApiResponse = useAPI(categoryAPI);

  const gameMode = (gameState: string) => {
    switch (gameState) {
      case EModes.init:
        if (questionNumber !== 0) setQuestionNumber(0);
        return (
          <>
            <Menu
              setGameState={setGameState}
              mode={EModes.init}
              questionsCount={questionsCount}
              setQuestionsCount={setQuestionsCount}
              category={data.data.trivia_categories}
            />
          </>
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

  return <>{data.loading ? <Loading /> : gameMode(gameState)}</>;
};

export default Game;
