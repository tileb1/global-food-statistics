import React from 'react';
import LazyLoad from 'react-lazyload';
import PartOne from './PartOne.js';
import PartTwo from './PartTwo.js';
import './App.css';

function App() {
  return (<div className="container">
    <h1 style={{marginTop: '50px'}}>Planet Cluedo</h1>

    <LazyLoad height={100}>
      <PartOne/>
    </LazyLoad>
    <LazyLoad height={100}>
      <PartTwo/>
    </LazyLoad>
  </div>);
}

export default App;
