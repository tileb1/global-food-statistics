import React from 'react';

function Tooltip({ width, height, tip }) {
  return (<>
    <filter id="dropshadow" height="130%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
      <feOffset dx="2" dy="2" result="offsetblur"/>
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.5"/>
      </feComponentTransfer>
      <feMerge> 
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <g pointerEvents="none" transform={`translate(${tip.x}, ${tip.y})`}>
      <rect x="0" y="0" width={width} height={height} fill="white" rx="15" stroke="#eee" style={{filter: "url(#dropshadow)"}}/>
      <svg width={width} height={height}>
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle">{tip.text}</text>
      </svg>
    </g>
  </>);
}

Tooltip.defaultProps = {
  width: 160,
  height: 40
}

export default Tooltip;
