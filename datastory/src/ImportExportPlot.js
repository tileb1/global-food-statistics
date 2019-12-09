import React, { useState, useEffect } from 'react';
import { stratify, lineRadial, curveBundle, cluster,
         ascending, scaleSqrt, interpolateBlues, format } from 'd3';

const purple = "#9b4dca";
const scale = scaleSqrt().domain([0.001, 6000000]).range([0.6, 1]);
const line = lineRadial()
  .curve(curveBundle.beta(0.85))
  .radius(d => d.y)
  .angle(d => d.x);
let neighbours;
let neighbours_set = new Set();

function ImportExportPlot() {
  let [countries, updateCountries] = useState(null);
  let [trades, updateTrades] = useState([]);
  let [selectedCountry, updateSelectedCountry] = useState(null);
  let [mode, setMode] = useState('export');

  useEffect(() => {
    fetch("trade_data.json").then((resp) => resp.json()).then((json) => {
      neighbours = json.exports_to;
      const tree = cluster().size([2 * Math.PI, 100]);
      const h = stratify().id((d) => d.id).parentId((d) => d.parent)(json.countries);
      const t = tree(h.sort((a, b) => ascending(a.height, b.height) || ascending(a.id)));
      updateCountries(t);
      let flatTree = {};
      t.each(n => {
        flatTree[n.id] = n;
      });

      updateTrades(json.trades.map(([amount, from, to]) => {
        return {
          exporter: from,
          importer: to,
          path: flatTree[from].path(flatTree[to]),
          amount
        }
      }));
    })
  }, []);

  const selectCountry = (c) => {
    // neighbours = new Set(t.);
    neighbours_set = new Set(neighbours[c.id]);
    // console.log(neighbours_set);
    updateSelectedCountry(c ? c : null);
  }

  const isSelected = (t) => {
    return selectedCountry && (
      (mode === 'export' && selectedCountry.id === t.exporter.toString())
      || (mode === 'import' && selectedCountry.id === t.importer.toString())
    );
  }

  return (<div className="plot">
    {/* Export/Import switch */}
    <div className="plot-switch">
      <button
        className={mode === 'export' ? 'button button-outline' : 'button button-clear'}
        onClick={() => setMode('export')}
      >
        Export
      </button>      
      <button
        className={mode === 'import' ? 'button button-outline' : 'button button-clear'}
        onClick={() => setMode('import')}
      >
        Import
      </button>
    </div>
    
    <svg viewBox="-200 -150 400 300" xmlns="http://www.w3.org/2000/svg">
      {selectedCountry && (<>
        <g
          fontSize="0.4em"
          transform="translate(-200, -140)"
        >
          {selectedCountry.data.top_exports.length > 0 && (<>
            <text fontWeight="bold">Top exports</text>
            {selectedCountry.data.top_exports.map((e, i) => (
              <text fontSize="0.8em" key={i} dy={8 + i * 7}>{e.name} — {format("$.2s")(e.value * 1000).replace(/G/,"B")}</text>         
            ))}
          </>)}
        </g>

        <g
          fontSize="0.4em"
          transform={`translate(-200, ${-140 + (selectedCountry.data.top_exports.length > 0 ? 14 : 0) + selectedCountry.data.top_exports.length * 7})`}
        >
          {selectedCountry.data.top_imports.length > 0 && (<>
            <text fontWeight="bold">Top imports</text>
            {selectedCountry.data.top_imports.map((e, i) => (
              <text fontSize="0.8em" key={i} dy={8 + i * 7}>{e.name} — {format("$.2s")(e.value * 1000).replace(/G/,"B")}</text>         
            ))}
          </>)}
        </g>
      </>)}

      {/* Loader */}
      {!countries && (
        <g transform="translate(-80, -80)">
          <image width="160" height="160" xlinkHref="/loader.svg" />
        </g>
      )}

      {/* Countries clockface */}
      {countries && (
        <g>
          {countries.leaves().map((l, i) => (
            <g
              key={i}
              transform={`rotate(${l.x * 180 / Math.PI - 90}) translate(${l.y},0)`}
            >
              <text
                className="country-tag"
                pointerEvents="bounding-box"
                style={{cursor: "pointer"}}
                fontSize="0.3em"
                dy="0.5em"
                x={l.x < Math.PI ? 6 : -6}
                textAnchor={l.x < Math.PI ? "start" : "end"}
                transform={l.x >= Math.PI ? "rotate(180)" : ""}
                onMouseEnter={() => selectCountry(l)}
                style={ neighbours_set.has(l.data.id) ? { fontWeight: 'bold' } : { fontWeight: 'normal' } }
                // onMouseLeave={() => selectCountry(null)}
              >{l.data.name}</text>
            </g>
          ))}
        </g>
      )}

      {/* Trade links */}
      {trades && (
        <g fill="none" stroke="#888">
          {trades.map((t, i) => (
            (!isSelected(t) && (
              <path
                key={i}
                style={{maxBlendMode: "none", opacity: 0.05, zIndex: 99}}
                stroke="#888"
                d={line(t.path)}
              />
            ))
          ))}
          {trades.map((t, i) => (
            (isSelected(t) && (
              <path
                key={i}
                style={{maxBlendMode: "none", opacity: 0.8, zIndex: 100}}
                stroke={interpolateBlues(scale(t.amount))}
                d={line(t.path)}
              />
            ))
          ))}
        </g>
      )}
    </svg>
  </div>);
}

export default ImportExportPlot;
