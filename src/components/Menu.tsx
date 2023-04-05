import React, { FC } from 'react';
import '../styles/menu.scss';

interface Props {
  setGameState: React.Dispatch<React.SetStateAction<string>>;
}

const Menu: FC<Props> = ({ setGameState }) => {
  const handlePlayClick = () => {
    setGameState('play');
  };

  return (
    <>
      <div className="menu">
        <button onClick={handlePlayClick} className="menu__item">
          Play
        </button>
        <button className="menu__item">Scores</button>
      </div>
    </>
  );
};

export default Menu;
