import ImportExportPlot from './ImportExportPlot';
import React, { useState, useEffect } from 'react';
import BarPlot from './BarPlot';
import { interpolateBlues } from 'd3';

function PartTwo() {
  return (<div className="part">
    <h2>Who are the suspects?</h2>
    <p>At this point of story we are interested in figuring out who are the main suspects. By suspects it is intended the countries that, by their agricultural sector, contribute the most towards the total of greenhouse gases and thus inderectly towards climate change. In this scenario of criminal trial, the principle of "presumption of innocence" will be adopted and we'll thus try to keep fairness in mind when pointing out the guilty guys.</p>
    <p>As a first approach, it is natural to simply look at the total carbon dioxide equivalent produced by the agricultural sector of each country. The top-10 biggest producer of greenhouse gases are displayed below.</p>
    {/* PLOT */}
    <p>The observed results are coherent with our intuition, countries such as China, India and USA were expected to be there. Moreover, we observe a strong correlation between the amount of CO2eq produced by a given country and its overall population. The latter is easily understandable as the emissions are related to the agricultural sector whose main objective is to produce food. It is therefore expected that countries with a larger number of people to feed have a higher contribution.</p>
    <p>As a result of the previous observations and with fairness as a motivation we decided to normalize the emissions by the population of the treated country.</p>
    {/* PLOT */}
    <p>We observe a significant change in the top-10 represented countries as small countries/regions did not appear in the previous plot as their absolute production of emissions of CO2eq was not high enough. Furhter researches highlighted the fact that most of the above listed countries have an economical strucuture havily based on the agricultural sector. For the story, `Falkland Islands (Malvinas)` which may appear as an outlier can be explained as it is currently ranked 5th in the worldwide GDP per capita and the fishing industry contributes towards 50-60% of its annual GDP. It might seem artifical to give so much weight to countries whose total contribution is not absolutely high, nevertheless these countries also have the largest improvement margin, at least it appears so. In fact, this method is still intrinsically unfair as it doesn't take into account the amount of food that transits between countries. It is very likely that some of the food produced in Falkland Islands (Malvinas) is then exported to other countries.</p>
    <p>A natural thing to do is to re-distribute the emissions related to exported food to its place of consumption.</p>


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
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
      {data && (<>
        <text x="150" y="15" fill="black" font-weight="bold">Top Exporters</text>
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
        <text x="550" y="15" fill="black" font-weight="bold">Top Importers</text>
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
