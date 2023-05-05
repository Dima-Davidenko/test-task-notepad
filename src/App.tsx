import React from 'react';
import './App.css';
import TopBar from './components/TopBar/TopBar';
import Sidebar from './components/Sidebar/Sidebar';
import Workspace from './components/Workspace/Workspace';

const App = () => {
  return (
    <div className="App">
      <TopBar />
      <div className="sideBar-workSpace-wrapper">
        <Sidebar />
        <Workspace />
      </div>
    </div>
  );
};

export default App;
