import ImportExportPlot from './ImportExportPlot';
import React, { useState, useEffect } from 'react';
import BarPlot from './BarPlot';
import { interpolateBlues } from 'd3';

function PartTwo() {
  return (<div className="part">
    <h2>Who are the suspects?</h2>
    <p>We have to normalize by import export blabablbala…. TRANSITION</p>
    <p>Looking at the bar plot for the top exporters, the USA spike above others countries by far. They export more than twice as much as the next country on the list. Regarding the importers, there isn’t a country that imports substantially more than the others. It is worth noticing that the largest exporters are semantically different from the importers. Large exporters seem to be countries with a large land area, a large economy and moderate climate. On the other hand, large importers are countries with a large economy, and either a small land area with a high population density or a very dry climate. This makes sense since food production requires a lot of land area and countries with a high population density don’t have enough land area to subsist their nutrition needs.</p>
    <PlotImportsExports/>
    <p>Despite its conciseness, the import-export plot conveys a lot of information. It illustrates trading quantities with regards to food between pairs of countries as well as the top traded items of each countries. Check it out by hovering over a country! The USA is a great example. Not only have we seen that it is the top exporter, it is also the country that exports to the most countries. You can also toggle the arcs from exports to imports on the upper right of the plot.</p>
    <ImportExportPlot/>
    <p>Looking at the general trends on the plot, it is worth noting that countries seem to be clustered by their geographical position. This is indeed what we would expect from a capitalist market as it reduces the shipping costs of the merchandise. Another little detail that is also worth noticing is that African countries don’t seem to trade together too much. At first, it might seem weird but we have to keep in mind that these countries already have a hard time with food as most of them are food deficit countries and have to import from other continents. As such, all the internal production is used by the locals and there is no incentive to trade with others. South-America seems to follow a similar trend although not as considerable.</p>
  </div>);
}

function PlotImportsExports() {
  const [data, setData] = useState(null);
  useEffect(() => {
    Promise.all([
      fetch("top_exporters.json"),
      fetch("top_importers.json")
    ]).then((r) => Promise.all(r.map(e => e.json()))).then(([em1, em2]) => {
      setData({
        exporters: em1,
        importers: em2
      })
    });
  }, [])

  const width = 300;
  const height = 300;
  const color = "blue";

  return (<div className="part">
    <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
      {data && (<>
        <BarPlot
          width={width}
          height={height}
          color={interpolateBlues(1)}
          data={data.exporters}
          // xLabel="Some"
          xLabelShift={500}
          yLabel="Export value [Billion $]"
          rotateXVals={true}
          transform="translate(30, 0)"
        />
        <BarPlot
          width={width}
          height={height}
          color={interpolateBlues(1)}
          data={data.importers}
          rotateXVals={true}
          yLabel="Import value [Billion $]"
          transform="translate(450, 0)"
        />
      </>)}
    </svg>
  </div>);
}

export default PartTwo;
