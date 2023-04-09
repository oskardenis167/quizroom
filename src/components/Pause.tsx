import React, { FC } from 'react';
import '../styles/pause.scss';
import { EModes } from './Enums/EModes';

interface IProps {
  setPause: React.Dispatch<React.SetStateAction<boolean>>;
  setGameState: React.Dispatch<React.SetStateAction<EModes>>;
}

const Pause: FC<IProps> = ({ setPause, setGameState }) => {
  const handleContinueClick = () => {
    setPause((prev) => !prev);
  };

  const handleRestartClick = () => {
    setGameState(EModes.init);
  };

  return (
    <div className="pause">
      <button onClick={handleContinueClick} className="menu__item">
        Continue
      </button>
      <button onClick={handleRestartClick} className="menu__item">
        Exit
      </button>
    </div>
  );
};

export default Pause;
