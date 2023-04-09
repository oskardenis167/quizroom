import React, { FC, useEffect, useRef, useState } from 'react';
import '../styles/quiz.scss';

interface IProps {
  pause: boolean;
  setAnswer: React.Dispatch<React.SetStateAction<string | null>>;
  questionNumber: number;
  answer: string | null;
}

const QuizTime: FC<IProps> = ({ pause, setAnswer, answer, questionNumber }) => {
  const startTime = 10;
  const [questionTime, setQuestionTime] = useState(
    (questionNumber + 1) * startTime
  );
  const timer = useRef<null | number>(null);

  const createTimer = () => {
    timer.current = setTimeout(() => {
      setQuestionTime((prev) => prev - 1);
    }, 1000);

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  };

  // useEffect(() => {
  //   createTimer();
  // }, []);

  useEffect(() => {
    if (pause === true && timer.current) {
      clearTimeout(timer.current);
    } else if (pause === false) {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      createTimer();
    }

    console.log(questionTime);

    if (questionTime === 0) {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      setAnswer('   ');
    }
  }, [pause, questionTime]);

  useEffect(() => {
    if (answer) {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      setQuestionTime(startTime);
      createTimer();
    }
  }, [answer]);

  const timerColor =
    questionTime > 30 ? '' : questionTime > 10 ? 'orange' : 'red';

  return (
    <span className={`quiz__time ${timerColor}`}>{`Time: ${
      questionTime > 9 ? questionTime : '0' + questionTime
    }`}</span>
  );
};

export default QuizTime;
