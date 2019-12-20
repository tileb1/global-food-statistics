import React, { useState, useEffect } from 'react';
import { interpolateBlues, interpolateOranges, interpolateGreens, interpolateRdYlBu, scaleLinear, scaleLog } from 'd3';
import { geoPath } from 'd3-geo';
import { geoRobinson } from 'd3-geo-projection';
import LinearPlot from './LinearPlot';

const projection = geoRobinson()
  .scale(70)
  .rotate([352, 0, 0])
  .translate( [-200, -200]);

const path = geoPath().projection(projection);

const PLOTS = {
  population: 'Population',
  temperatures: 'Temperatures',
  carbon_stock: 'Carbon Stock',
  co2: ['CO', <sub key='wtfreact?'>2</sub>]
}

const SCALES = {
  population: scaleLog().domain([640, 1400000000]).range([0, 1]),
  temperatures: scaleLinear().domain([-3, 3]).range([1, 0]),
  carbon_stock: scaleLog().domain([0.1, 65000]).range([0, 1]),
  co2: scaleLog().domain([0.0001, 0.08]).range([0, 1])
}

const COLORS = {
  population: interpolateBlues,
  temperatures: interpolateRdYlBu,
  carbon_stock: interpolateGreens,
  co2: interpolateOranges
}


function AllCountriesPlot() {
  let [countries, updateCountries] = useState(null);
  let [data, updateData] = useState(null);
  let [mode, setMode] = useState('population');
  let [year, setYear] = useState(2000);

  useEffect(() => {
    fetch("world_countries.json").then((resp) => resp.json()).then((json) => {
      updateCountries(json.features);
    })
  }, [])

  useEffect(() => {
    fetch(mode + '.json').then((resp) => resp.json()).then((json) => {
      updateData(json);
    });
  }, [mode]);

  const countryColor = (c) => {
    if (data && data.countries[year][c.id]) {
      return COLORS[mode](SCALES[mode](data.countries[year][c.id]));
    } else {
      return '#aaa';
    } 
  } 

  const changeYear = (e) => {
    setYear(e.target.value)
  }

  return (<div className="all-countries-plot">
    <div className="plot-switch">
      {Object.keys(PLOTS).map((k, i) => (
        <button
          className={`button ${k === mode ? 'button-outline' : 'button-clear'}`}
          key={i}
          onClick={() => {
            updateData(null);
            setYear(2000);
            setMode(k);
          }}
        >
          {PLOTS[k]}
        </button>
      ))}
    </div>
    <svg viewBox="-400 -300 400 300" xmlns="http://www.w3.org/2000/svg">
      {/* <LinearPlot data={} /> */}
      <g transform="translate(0, 120)">
        {countries && countries.map((c, i) => {
          return (
          <path
            key={i}
            d={path(c)}
            fill={countryColor(c)}
          />
        )})}
      </g>
    </svg>
    {data && (
      <input
        style={{width: '100%'}}
        type="range"
        min={data.metadata.minYear}
        max={data.metadata.maxYear}
        value={year}
        onChange={changeYear}
        step="1"
      />
    )}
  </div>);
}

export default AllCountriesPlot;
