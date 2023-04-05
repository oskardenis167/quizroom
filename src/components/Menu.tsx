import React from 'react';
import '../styles/menu.scss';

const menu = (
  <div className="menu">
    <a href="" className="menu__item">
      Play
    </a>
    <a href="" className="menu__item">
      Scores
    </a>
  </div>
);

const Menu = () => {
  return <>{menu}</>;
};

export default Menu;
