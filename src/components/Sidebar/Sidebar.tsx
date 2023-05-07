import React from 'react';

const Sidebar: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className="sideBar">Sidebar {children}</div>;
};

export default Sidebar;
