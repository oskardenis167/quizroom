// NODE MODULES
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// COMPONENTS
import Menu from './Menu';
import Quiz from './Quiz';
import { EModes } from './Enums/EModes';
import { useAPI, TApiResponse } from './hooks/useAPI';
import Loading from './Loading';

// STYLES
import '../styles/game.scss';

const Game = () => {
  const [gameState, setGameState] = useState(EModes.init); // zmienic na init
  const [questionNumber, setQuestionNumber] = useState(0);
  const [questionsCount, setQuestionsCount] = useState(10);

  const categoryAPI = 'https://opentdb.com/api_category.php';
  const dataAPI: TApiResponse = useAPI(categoryAPI);
  const [selectedCategory, setSelectedCategory] = useState(0);

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
              category={dataAPI.data.trivia_categories}
              setSelectedCategory={setSelectedCategory}
            />
          </>
        );
      case EModes.play:
        return (
          <Quiz
            setGameState={setGameState}
            mode={EModes.play}
            questionNumber={questionNumber}
            setQuestionNumber={setQuestionNumber}
            questionsCount={questionsCount}
            selectedCategory={selectedCategory}
          />
        );
      default:
        console.log('error mode');
        throw Error('error mode');
    }
  };

  return <>{dataAPI.loading ? <Loading /> : gameMode(gameState)}</>;
};

export default Game;
