import React from 'react';
import LazyLoad from 'react-lazyload';
import PartOne from './PartOne.js';
import PartTwo from './PartTwo.js';
import './App.css';

function App() {
  return (<>
    <div className="header">
      <div className="container">
        <h1>Planet Cluedo</h1>
      </div>      
    </div>
    <div className="container main">
      <LazyLoad height={100}>
        <PartOne/>
      </LazyLoad>
      <LazyLoad height={100}>
        <PartTwo/>
      </LazyLoad>
    </div>
  </>);
}

export default App;
