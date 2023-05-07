import React from 'react';
import css from './Sidebar.module.css';

const Sidebar: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className={css.sideBar}>{children}</div>;
};

export default Sidebar;
