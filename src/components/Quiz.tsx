import React, { FC, useEffect, useState } from 'react';
import { EModes } from './Enums/EModes';
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
  selectedCategory: number;
}

const Quiz: FC<IProps> = ({
  setGameState,
  mode,
  questionNumber,
  setQuestionNumber,
  questionsCount,
  selectedCategory,
}) => {
  const [answer, setAnswer] = useState<null | string>(null);
  const [pause, setPause] = useState(false);
  const [points, setPoints] = useState(0);

  const category =
    selectedCategory !== 0 ? `&category=${selectedCategory}` : '';

  const API = `https://opentdb.com/api.php?amount=${questionsCount}${category}&encode=url3986`;
  console.log(API);
  const dataAPI: TApiResponse = useAPI(API);

  const handleEscClick = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setPause((prev) => !prev);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEscClick);
    return () => {
      window.addEventListener('keydown', handleEscClick);
    };
  }, []);

  if (!dataAPI.loading) {
    console.log(dataAPI.data.results);
  }

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
