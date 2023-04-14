import React, { FC } from 'react';

interface IProps {
  type: string;
  number?: number;
  value: string;
  additionalClass?: string;
}

const QuizText: FC<IProps> = ({ type, number, value, additionalClass }) => {
  return (
    <span className={`quiz__${type} ${additionalClass}`}>
      {number ? `${number}) ` : null}
      {decodeURIComponent(value)}
    </span>
  );
};

export default QuizText;
