import React, { FC } from 'react';
import QuizButton from './QuizButton';
import { IProps } from './Interfaces/Answers';

const QuizButtons: FC<IProps> = ({ answers, setAnswer }) => {
  const buttons = answers.map((answer) => (
    <QuizButton key={answer} value={answer} setAnswer={setAnswer} />
  ));
  return <div className="quiz__buttons">{buttons}</div>;
};

export default QuizButtons;
