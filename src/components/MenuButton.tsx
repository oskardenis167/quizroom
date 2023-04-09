import React, { FC } from 'react';
import { EModes } from './Enums/EModes';

interface IProps {
  setGameState: React.Dispatch<React.SetStateAction<EModes>>;
  mode: EModes;
  value: string;
}

const MenuButton: FC<IProps> = ({ setGameState, mode, value }) => {
  const handleClick = () => {
    setGameState(mode);
  };

  return (
    <>
      <button onClick={handleClick} className="menu__item">
        {value}
      </button>
    </>
  );
};

export default MenuButton;
