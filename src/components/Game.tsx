import React, { useEffect, useState } from 'react';
import '../styles/game.scss';
import Menu from './Menu';
import Quiz from './Quiz';
import { EModes } from './Enums/EModes';
import axios from 'axios';
import { ICategoryResponse } from './Interfaces/ICategoryResponse';

const Game = () => {
  const [gameState, setGameState] = useState(EModes.init); // zmienic na init
  const [questionNumber, setQuestionNumber] = useState(0);
  const [questionsCount, setQuestionsCount] = useState(10);
  const [category, setCategory] = useState<null | ICategoryResponse[]>(null);
  const [loading, setLoading] = useState(true);

  const categoryAPI = 'https://opentdb.com/api_category.php';

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axios.get(categoryAPI);
        setCategory(data.trivia_categories);
        // console.log(data.trivia_categories);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('error message: ', error.message);
          return error.message;
        } else {
          console.log('unexpected error: ', error);
          return 'An unexpected error occurred';
        }
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

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
              category={category}
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

  return (
    <>
      {loading ? <span className="quiz__loading"></span> : gameMode(gameState)}
    </>
  );
};

export default Game;
