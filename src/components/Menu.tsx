import React, { FC } from 'react';
import '../styles/menu.scss';
import MenuButton from './MenuButton';
import { EModes } from './Enums/EModes';
import { IoAdd, IoRemove } from 'react-icons/io5';
import MenuQuestion from './MenuQuestion';

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
  const menuSelect = () => {
    if (mode === EModes.init) {
      return (
        <>
          <MenuButton
            setGameState={setGameState}
            mode={EModes.play}
            value="Play"
          />
          <MenuQuestion
            setQuestionsCount={setQuestionsCount}
            questionsCount={questionsCount}
          />
          {/* <MenuButton
            setGameState={setGameState}
            mode={EModes.scores}
            value="Scores"
          /> */}
        </>
      );
      // } else if (mode === EModes.paused) {
      //   return (
      //     <>
      //       <MenuButton
      //         setGameState={setGameState}
      //         mode={EModes.play}
      //         value="Continue"
      //       />
      //       <MenuButton
      //         setGameState={setGameState}
      //         mode={EModes.init}
      //         value="Exit"
      //       />
      //     </>
      //   );
    }
  };

  return (
    <>
      <div className="menu">{menuSelect()}</div>
    </>
  );
};

export default Menu;
