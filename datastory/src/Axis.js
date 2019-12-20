import React from 'react';
import { select } from 'd3-selection';

function Axis({ axisCreator, rotateXVals, ...props}) {
  const axisRef = axis => {
    if (axis) {
      axisCreator(select(axis));

      if (rotateXVals) {
        select(axis).selectAll("text")	
          .style("text-anchor", "end")
          .attr("dx", "-1em")
          .attr("dy", "-0.5em")
          .attr("transform", "rotate(-90)")
      }
    }
  };
  return <g ref={axisRef} {...props} />;
}

Axis.defaultProps = {
  rotateXVals: false,
}

export default Axis;
