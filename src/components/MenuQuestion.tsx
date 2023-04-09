import React, { FC } from 'react';
import { IoAdd, IoRemove } from 'react-icons/io5';

interface IProps {
  setQuestionsCount: React.Dispatch<React.SetStateAction<number>> | undefined;
  questionsCount: number | undefined;
}

const MenuQuestion: FC<IProps> = ({ setQuestionsCount, questionsCount }) => {
  const handleQuestionAdd = () => {
    if (setQuestionsCount) {
      setQuestionsCount((prev) => prev + 1);
    }
  };

  const handleQuestionMinus = () => {
    if (setQuestionsCount) {
      setQuestionsCount((prev) => prev - 1);
    }
  };

  const handleChangeQuestionsCount = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (setQuestionsCount) {
      if (parseInt(event.target.value) > 20) {
        alert('Can not do over 20 question in one game');
      } else if (parseInt(event.target.value) < 1) {
        alert('Set minimum 1 question to solve quiz');
      } else {
        setQuestionsCount(parseInt(event.target.value));
      }
    }
  };

  return (
    <div className="question">
      <span className="question__add" onClick={handleQuestionAdd}>
        <IoAdd />
      </span>
      <input
        type="number"
        className="question__input menu__item"
        value={questionsCount}
        onChange={handleChangeQuestionsCount}
        min={1}
        max={20}
      />
      <span className="question__minus" onClick={handleQuestionMinus}>
        <IoRemove />
      </span>
    </div>
  );
};

export default MenuQuestion;
