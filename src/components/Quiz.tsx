import axios, { AxiosError } from 'axios';
import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import { EModes } from './Enums/EModes';
import { IQuizResponse } from './Interfaces/IQuizResponse';
import QuizButtons from './QuizButtons';
import '../styles/quiz.scss';
import Pause from './Pause';
import QuizPoints from './QuizPoints';
import QuizTime from './QuizTime';

interface IProps {
  setGameState: React.Dispatch<React.SetStateAction<EModes>>;
  mode: EModes;
  questionNumber: number;
  setQuestionNumber: React.Dispatch<React.SetStateAction<number>>;
  questionsCount: number;
}

const Quiz: FC<IProps> = ({
  setGameState,
  mode,
  questionNumber,
  setQuestionNumber,
  questionsCount,
}) => {
  const [data, setData] = useState<null | IQuizResponse[]>(null);
  const [loading, setLoading] = useState(true);
  // const [questionNumber, setQuestionNumber] = useState(0);
  const [answer, setAnswer] = useState<null | string>(null);
  const [pause, setPause] = useState(false);
  const [points, setPoints] = useState(0);

  const API = `https://opentdb.com/api.php?amount=${questionsCount}&category=9&&encode=url3986`;

  // console.log(answer);

  const handleEscClick = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setPause((prev) => !prev);
    }
  };
  // console.log(pause);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axios.get(API);
        setData(data.results);
        window.addEventListener('keydown', handleEscClick);
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

      return () => window.addEventListener('keydown', handleEscClick);
    };
    getUsers();
  }, []);

  //answer clicked
  useEffect(() => {
    if (answer && data) {
      // console.log(answer);
      if (answer === data[questionNumber].correct_answer) {
        alert('dobrze');
        setPoints((prev) => prev + 1);
      } else {
        alert('zle');
      }

      setAnswer(null);

      if (questionNumber === questionsCount - 1) {
        alert('end');
        setGameState(EModes.init);
      } else {
        setQuestionNumber((prev) => prev + 1);
      }
    }
  }, [answer]);

  // useEffect(() => {
  //   console.log('xd');
  // }, [questionNumber]);

  const quizEl = (
    <>
      {loading && <span className="quiz__loading"></span>}

      {data && (
        <>
          <p className="quiz__question">{`${
            questionNumber + 1
          }) ${decodeURIComponent(data[questionNumber].question)}`}</p>
          <p className="quiz__category">
            {decodeURIComponent(data[questionNumber].category)}
          </p>

          <p className={`quiz__difficulty ${data[questionNumber].difficulty}`}>
            {decodeURIComponent(data[questionNumber].difficulty)}
          </p>
          <QuizButtons
            setAnswer={setAnswer}
            answers={[
              data[questionNumber].correct_answer,
              ...data[questionNumber].incorrect_answers,
            ]}
          />
          <QuizPoints points={points} questionsCount={questionsCount} />
          {pause && <Pause setPause={setPause} setGameState={setGameState} />}

          <QuizTime
            pause={pause}
            setAnswer={setAnswer}
            answer={answer}
            questionNumber={questionNumber}
          />
        </>
      )}
    </>
  );

  return <div className="quiz">{quizEl}</div>;
};

export default Quiz;
