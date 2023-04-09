import React, { FC } from 'react';
import '../styles/menu.scss';
import MenuButton from './MenuButton';
import { EModes } from './Enums/EModes';

interface IProps {
  setGameState: React.Dispatch<React.SetStateAction<EModes>>;
  mode: EModes;
  questionsCount?: number;
  setQuestionsCount?: React.Dispatch<React.SetStateAction<number>>;
}

const Menu: FC<IProps> = ({
  setGameState,
  mode,
  questionsCount,
  setQuestionsCount,
}) => {
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
    <>
      <div className="menu">
        <MenuButton
          setGameState={setGameState}
          mode={EModes.play}
          value="Play"
        />
        {mode === EModes.init && (
          <input
            type="number"
            value={questionsCount}
            onChange={handleChangeQuestionsCount}
            min={1}
            max={20}
            className="menu__item"
          />
        )}
        <MenuButton
          setGameState={setGameState}
          mode={EModes.scores}
          value="Scores"
        />
      </div>
    </>
  );
};

export default Menu;
