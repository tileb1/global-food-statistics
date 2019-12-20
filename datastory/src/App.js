import React from 'react';
import LazyLoad from 'react-lazyload';
import PartOne from './PartOne.js';
import PartTwo from './PartTwo.js';
import PartThree from './PartThree.js';
import './App.css';

function App() {
  return (<>
    <div className="header">
      <div className="container">
        <h1>Planet Cluedo</h1>
      </div>      
    </div>
    <div className="container main">
      <LazyLoad height={1000}>
        <PartOne/>
      </LazyLoad>
      <LazyLoad height={1000}>
        <PartTwo/>
      </LazyLoad>
      <LazyLoad height={1000}>
        <PartThree/>
      </LazyLoad>
    </div>
  </>);
}

export default App;
