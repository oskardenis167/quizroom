import axios, { AxiosError } from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { EModes } from './Enums/EModes';
import { IQuizResponse } from './Interfaces/QuizResponse';
import QuizButtons from './QuizButtons';

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

  const API = `https://opentdb.com/api.php?amount=${questionsCount}`;

  // console.log(answer);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axios.get(API);
        setData(data.results);
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

  useEffect(() => {
    if (answer && data) {
      console.log(answer);
      answer === data[questionNumber].correct_answer
        ? alert('wygrana')
        : alert('przegrana');
    }
    // kolejne pytanie po odp
    if (questionsCount >= questionNumber) {
      setQuestionNumber((prev) => prev + 1);
    }
    // questionNumber <= setQuestionNumber((prev) => prev + 1);
  }, [answer]);

  console.log(data);

  return (
    <>
      {loading && <span>Loading</span>}

      {data && (
        <>
          <p>{data[questionNumber].category}</p>
          <p>{data[questionNumber].question}</p>
          <p>{data[questionNumber].difficulty}</p>
          {/* <p>{data[questionNumber].correct_answer}</p> */}
        </>
      )}

      {data && (
        <QuizButtons
          setAnswer={setAnswer}
          answers={[
            data[questionNumber].correct_answer,
            ...data[questionNumber].incorrect_answers,
          ]}
        />
      )}
    </>
  );
};

export default Quiz;
