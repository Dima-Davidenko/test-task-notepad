import React from 'react';

const TopBar: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className="topBar">{children}</div>;
};

export default TopBar;
