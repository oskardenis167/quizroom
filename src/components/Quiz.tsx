import axios, { AxiosError } from 'axios';
import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import { EModes } from './Enums/EModes';
import IQuizResponse from './Interfaces/IQuizResponse';
import QuizButtons from './QuizButtons';
import '../styles/quiz.scss';
import Pause from './Pause';
import QuizPoints from './QuizPoints';
import QuizTime from './QuizTime';
import { useAPI, TApiResponse } from './hooks/useAPI';
import Loading from './Loading';
import QuizText from './QuizText';

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
  const dataAPI: TApiResponse = useAPI(API);

  const handleEscClick = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setPause((prev) => !prev);
    }
  };
  // console.log(pause);

  useEffect(() => {
    window.addEventListener('keydown', handleEscClick);
    return () => {
      window.addEventListener('keydown', handleEscClick);
    };
  }, []);

  if (!dataAPI.loading) {
    console.log(dataAPI.data.results);
  }

  /*
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
  */

  //answer clicked
  // useEffect(() => {
  //   if (answer && data) {
  //     // console.log(answer);
  //     if (answer === data[questionNumber].correct_answer) {
  //       alert('dobrze');
  //       setPoints((prev) => prev + 1);
  //     } else {
  //       alert('zle');
  //     }

  //     setAnswer(null);

  //     if (questionNumber === questionsCount - 1) {
  //       alert('end');
  //       setGameState(EModes.init);
  //     } else {
  //       setQuestionNumber((prev) => prev + 1);
  //     }
  //   }
  // }, [answer]);

  useEffect(() => {
    if (answer && dataAPI) {
      // console.log(answer);
      if (answer === dataAPI.data.results[questionNumber].correct_answer) {
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

  const quizEl = () => {
    const quizEl = (
      <>
        {dataAPI.loading ? (
          <Loading />
        ) : (
          <>
            <QuizText
              type="question"
              number={questionNumber + 1}
              value={dataAPI.data.results[questionNumber].question}
            />
            <QuizText
              type="category"
              value={dataAPI.data.results[questionNumber].category}
            />
            <QuizText
              type="difficulty"
              additionalClass={dataAPI.data.results[questionNumber].difficulty}
              value={dataAPI.data.results[questionNumber].difficulty}
            />
            <QuizButtons
              setAnswer={setAnswer}
              answers={[
                dataAPI.data.results[questionNumber].correct_answer,
                ...dataAPI.data.results[questionNumber].incorrect_answers,
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

    return quizEl;
  };

  return <div className="quiz">{quizEl()}</div>;
};

export default Quiz;
