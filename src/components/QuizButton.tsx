import React, { FC } from 'react';

interface IProps {
  value: string;
  setAnswer: React.Dispatch<React.SetStateAction<string | null>>;
}

const QuizButton: FC<IProps> = ({ value, setAnswer }) => {
  const handleQuizButton = () => {
    setAnswer(value);
  };

  return (
    <button onClick={handleQuizButton} className="quiz__button">
      {decodeURIComponent(value)}
    </button>
  );
};

export default QuizButton;
