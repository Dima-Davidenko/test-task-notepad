import React from 'react';
import css from './TopBar.module.css';

const TopBar: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className={css.topBar}>{children}</div>;
};

export default TopBar;
