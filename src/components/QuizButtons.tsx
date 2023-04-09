import React, { FC } from 'react';
import QuizButton from './QuizButton';
import { IProps } from './Interfaces/Answers';

const QuizButtons: FC<IProps> = ({ answers, setAnswer }) => {
  const shuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const decodeAnswers = answers.map((answer) => decodeURIComponent(answer));

  if (
    decodeAnswers[0].toLowerCase() == 'true' ||
    decodeAnswers[0].toLowerCase() == 'false'
  ) {
    if (decodeAnswers[0].toLowerCase() == 'false') {
      [decodeAnswers[0], decodeAnswers[1]] = [
        decodeAnswers[1],
        decodeAnswers[0],
      ];
    }
  } else {
    shuffleArray(decodeAnswers);
  }

  const buttons = decodeAnswers.map((answer) => (
    <QuizButton key={answer} value={answer} setAnswer={setAnswer} />
  ));
  return <div className="quiz__buttons">{buttons}</div>;
};

export default QuizButtons;
