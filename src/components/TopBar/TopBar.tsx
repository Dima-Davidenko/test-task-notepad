import React from 'react';
import MainMenu from '../MainMenu/MainMenu';
import SearchBox from '../SearchBox/SearchBox';

const TopBar = () => {
  return (
    <div className="topBar">
      <MainMenu />
      <SearchBox />
    </div>
  );
};

export default TopBar;
