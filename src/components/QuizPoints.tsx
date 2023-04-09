import React, { FC } from 'react';

interface IProps {
  points: number;
  questionsCount: number;
}

const QuizPoints: FC<IProps> = ({ points, questionsCount }) => {
  return <div className="quiz__points">{`${points}/${questionsCount}`}</div>;
};

export default QuizPoints;
