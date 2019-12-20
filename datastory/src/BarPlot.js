import React, { useState } from 'react';
import { scaleLinear, scaleBand, axisBottom, axisLeft, max, clientPoint } from 'd3';
import Axis from './Axis.js';
import Tooltip from './Tooltip.js';

function BarPlot({width, height, color, data, ...props}) {
  const margin = {top: 20, right: 0, bottom: 30, left: 40};
  const rotateXVals = props.rotateXVals || false;

  let x = scaleBand()
    .domain(data.map(d => d.key))
    .range([margin.left, width - margin.right])
    .padding(0.1);
  let y = scaleLinear()
    .domain([0, max(data, d => d.value)]).nice()
    .range([height - margin.bottom, margin.top]);
  let xAxis = axisBottom(x);
  let yAxis = axisLeft(y);
  let [tip, setTip] = useState(null);

  return (<g transform={props.transform ? props.transform : ""}>
    {data && data.map((d, i) => <g key={i}>
      <rect
        x={x(d.key)}
        y={y(d.value)}
        height={y(0) - y(d.value)}
        width={x.bandwidth()}
        fill={color}
        onMouseMove={(e) => {
          const [x, y] = clientPoint(e.target, e);
          if (d.tip) setTip({text: d.tip, x: x - 80, y: y - 45})
        }}
        onMouseOut={() => setTip(null)}
      />
      {props.yLabel && (
        <text
          transform="rotate(-90)"
          y={0 - (props.yLabelShift || 10)}
          x={0 - (height / 2)}
          dy="1em"
          fontSize="0.8em"
          textAnchor="middle"
        >
          {props.yLabel}
        </text>
      )}
      {props.xLabel && (
        <text
          y={height - margin.top + (props.xLabelShift || 10)}
          x={0 + (width / 2)}
          dy="1em"
          fontSize="0.8em"
          textAnchor="middle"
        >
          {props.xLabel}
        </text>
      )}
      <Axis
        axisCreator={yAxis}
        transform={`translate(${margin.left},0)`}
      />
      <Axis
        axisCreator={xAxis}
        rotateXVals={rotateXVals}
        transform={`translate(0,${height - margin.bottom})`}
      />
    </g>)}
    {tip && (<Tooltip tip={tip} />)}
  </g>);
}

export default BarPlot;
