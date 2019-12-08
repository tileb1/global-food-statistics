import React, { useState, useEffect } from 'react';
import { stratify, lineRadial, curveBundle, cluster,
         ascending, scaleSqrt, interpolateBlues, format } from 'd3';

// const scale = scaleSqrt().domain([0.001, 6000000]).range([0.6, 1]);
// const line = lineRadial()
//   .curve(curveBundle.beta(0.85))
//   .radius(d => d.y)
//   .angle(d => d.x);

function AllCountriesPlot() {
  // let [countries, updateCountries] = useState(null);
  // let [trades, updateTrades] = useState([]);
  // let [selectedCountry, updateSelectedCountry] = useState(null);
  // let [mode, setMode] = useState('export');

  useEffect(() => {
    // fetch("trade_data.json").then((resp) => resp.json()).then((json) => {
    //   const tree = cluster().size([2 * Math.PI, 150]);
    //   const h = stratify().id((d) => d.id).parentId((d) => d.parent)(json.countries);
    //   const t = tree(h.sort((a, b) => ascending(a.height, b.height) || ascending(a.id)));
    //   updateCountries(t);
    //   let flatTree = {};
    //   t.each(n => {
    //     flatTree[n.id] = n;
    //   });

    //   updateTrades(json.trades.map(([amount, from, to]) => {
    //     return {
    //       exporter: from,
    //       importer: to,
    //       path: flatTree[from].path(flatTree[to]),
    //       amount
    //     }
    //   }));
    // })
  }, []);

  // const selectCountry = (c) => {
  //   updateSelectedCountry(c ? c : null);
  // }

  // const isSelected = (t) => {
  //   return selectedCountry && (
  //     (mode === 'export' && selectedCountry.id === t.exporter.toString())
  //     || (mode === 'import' && selectedCountry.id === t.importer.toString())
  //   );
  // }

  return (<div className="all-countries-plot">
    <div className="plot-switch">
      <button className="button">Population</button>      
      <button className="button button-clear">Temperature</button>      
      <button className="button button-clear">CO<sub>2</sub></button>      
    </div>
    <svg viewBox="-400 -400 400 400" xmlns="http://www.w3.org/2000/svg">
    </svg>
  </div>);
}

export default AllCountriesPlot;
