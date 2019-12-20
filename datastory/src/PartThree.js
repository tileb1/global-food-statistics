import ImportExportPlot from './ImportExportPlot';
import React, { useState, useEffect } from 'react';
import BarPlot from './BarPlot';
import { interpolateBlues } from 'd3';
import { ReactComponent as Logo } from './logo.svg';

function PartTwo() {
  return (<div className="part">
    <h2>Who are the suspects?</h2>
    <p>At this point of the story we are interested in figuring out who are the main suspects. By suspects we mean the countries that, by their agricultural sector, contribute the most towards greenhouse gas emissions and thus climate change. In this scenario of a criminal trial, the principle of "presumption of innocence" will be adopted and we'll thus try to keep fairness in mind when pointing out the guilty actors.</p>
    <p>Before looking at green house gas emissions directly, we investigate a hand full of countries' food supplies. As the main objective of agriculture is the production of food for human consumption, it is interesting to see how well different countries were able to provide a sufficient amount of food to its respective population over time. This data is available to us under the form of "food supply". This attribute corresponds to the amount of food available for human consumption. It takes both, the food produced inside a country and its importations into account. The top-5 most populated countries are responsible for more than 50% of the overall population. Therefore by only studying these countries, which are fairly diverse, we can already get a good idea of the big picture about the availability of food in the world.</p>
    
    {/* !!!TODO IVAN: PLOT THIS PROPERLY!!! */}
    <div>
    {/* Logo is an actual React component */}
    <Logo />
    </div>
    {/* !!!TODO IVAN: PLOT THIS PROPERLY!!! */}

    <p>We clearly observe a general increase in food availability across the world. For instance, China's food supply has doubled since the 60's. Even though this evolution is good news, especially in a country that potentially suffered from food deprivation, it has to be taken with a grain of salt. Indeed, as we can only observe the amount of food available at the country level, there is no way to assess its availability at the individual level. Moreover, taking 2000 kcal as a rough estimate of the required daily calorie intake for an average adult, we can safely assume that a fair amount of food is wasted. In this regard, we can observe that out of the top 5 populated countries of the world, the United States provides a substantial larger amount of food to its inhabitants (on average), which in turn we could assume a lot of which is wasted. From a global point of view, we can see that today, on average, everyone has roughly 2600 kcal made available to them every day. Comparing this to the average daily intake of grown adult male of 2000 kcal per day, we can make a very rough estimate that 30% of food is wasted globally. As we've already illustrated the CO2 cost behind food production, this leads to the fact that we could notably reduce CO2 emissions by diminishing the amount of food wasted (which would reduce production).</p>
    <p>Now we take a more direct approach at look at CO2eq emissions caused by countries' agricultural activity. As a first approach, it is natural to simply look at the total carbon dioxide equivalent produced by the agricultural sector of each country. The top-10 biggest producer of greenhouse gases are displayed below.</p>
    <PlotCO2/>
    <p>The observed results are coherent with our intuition. Countries such as China, India and USA are present, as we expected. Moreover, we observe a strong correlation between the amount of CO2eq produced by a given country and its overall population. The latter is easily understandable as the emissions are related to the agricultural sector whose main objective is to produce food. It is therefore expected that countries with a larger number of people to feed contribute more to CO2eq emissions.</p>
    <p>As a result of the previous observations and with fairness in mind, we decided to normalise a country’s emissions by its population.</p>
    <PlotCO2Capita/>
    <p>We observe a significant change in the top-10 represented countries as smaller countries now make the cut. These did not appear in the previous plot as their absolute production of emissions of CO2eq was not high enough. Further researches highlighted the fact that most of the above listed countries have an economical structure heavily based on the agricultural sector. For instance, the fact that the Falkland Islands tops this list, which at first may appear as an outlier, is due to the fact that it is currently ranked 5th in the world in terms of GDP per capita and its fishing industry contributes towards 50-60% of its annual GDP. It might seem artificial to give so much weight to countries whose total contribution is not absolutely high, nevertheless these countries also have the largest improvement margin, at least it appears so. In fact, this method is still intrinsically unfair as it doesn't take into account the amount of food that transits between countries. This is exactly the reason for which the Falkland Islands tops this list as the vast majority of the food they produce are for exports and hence for the consumption of other countries. Therefore, a natural thing to do is to re-distribute the emissions related to exported food to its place of consumption.</p>
    <p>Before doing so, we investigate how countries of the world help each other in meeting their nutritional needs by analysing the import and export activity of the agricultural industry. To begin with, we plot the top 10 food exporters and importers of the world in absolute values below:</p>
    <PlotImportsExports/>
    <p>Looking at the bar plot for the top exporters, the USA spike above others countries by far. They export more than twice as much as the next country on the list. Regarding the importers, there isn’t a country that imports substantially more than the others. It is worth noticing that the largest exporters are semantically different from the importers. Large exporters seem to be countries with a large land area, a large economy and moderate climate. On the other hand, large importers are countries with a large economy, and either a small land area with a high population density or a very dry climate. This makes sense since food production requires a lot of land area and countries with a high population density don’t have enough land area to subsist their nutrition needs.</p>
    <ImportExportPlot/>
    <p>Despite its conciseness, the import-export plot conveys a lot of information. It illustrates trading quantities with regards to food between pairs of countries as well as the top traded items of each countries. Check it out by hovering over a country! The USA is a great example. Not only have we seen that it is the top exporter, it is also the country that exports to the most countries. You can also toggle the arcs from exports to imports on the upper right of the plot.</p>
    <p>Looking at the general trends on the plot, it is worth noting that countries seem to be clustered by their geographical position. This is indeed what we would expect from a capitalist market as it reduces the shipping costs of the merchandise. Another little detail that is also worth noticing is that African countries don’t seem to trade together too much. At first, it might seem weird but we have to keep in mind that these countries already have a hard time with food as most of them are food deficit countries and have to import from other continents. As such, all the internal production is used by the locals and there is no incentive to trade with others. South-America seems to follow a similar trend although not as considerable.</p>
    <PlotCO2CapitaNorm/>
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


function PlotCO2() {
  const [data, setData] = useState(null);
  useEffect(() => {
    Promise.all([
      fetch("top10_co2_countries.json")
      // fetch("top_importers.json")
    ]).then((r) => Promise.all(r.map(e => e.json()))).then(([em1, em2]) => {
      setData({
        exporters: em1,
        importers: em2
      })
    });
  }, [])

  const width = 750;
  const height = 300;
  const color = "blue";

  return (<div className="part">
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
      {data && (<>
        <text x="300" y="15" fill="black" font-weight="bold">Top 10 CO2eq contributors</text>
        <BarPlot
          width={width}
          height={height}
          color={interpolateBlues(1)}
          data={data.exporters}
          // xLabel="Some"
          xLabelShift={500}
          yLabel="CO2eq [MTonnes]"
          rotateXVals={true}
          transform="translate(30, 0)"
        />
        {/* <text x="550" y="15" fill="black" font-weight="bold">Top Importers</text> */}
        {/* <BarPlot
          width={width}
          height={height}
          color={interpolateBlues(1)}
          data={data.importers}
          rotateXVals={true}
          yLabel="Import value [Billion $]"
          transform="translate(450, 0)"
        /> */}
      </>)}
    </svg>
  </div>);
}

function PlotCO2Capita() {
  const [data, setData] = useState(null);
  useEffect(() => {
    Promise.all([
      fetch("top10_co2_countries_per_capita.json")
      // fetch("top_importers.json")
    ]).then((r) => Promise.all(r.map(e => e.json()))).then(([em1, em2]) => {
      setData({
        exporters: em1,
        importers: em2
      })
    });
  }, [])

  const width = 750;
  const height = 300;
  const color = "blue";

  return (<div className="part">
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
      {data && (<>
        <text x="300" y="15" fill="black" font-weight="bold">Top 10 CO2eq contributors / Capita</text>
        <BarPlot
          width={width}
          height={height}
          color={interpolateBlues(1)}
          data={data.exporters}
          // xLabel="Some"
          xLabelShift={500}
          yLabel="CO2eq [log(Tonnes / Capita)]"
          rotateXVals={true}
          transform="translate(30, 0)"
        />
        {/* <text x="550" y="15" fill="black" font-weight="bold">Top Importers</text> */}
        {/* <BarPlot
          width={width}
          height={height}
          color={interpolateBlues(1)}
          data={data.importers}
          rotateXVals={true}
          yLabel="Import value [Billion $]"
          transform="translate(450, 0)"
        /> */}
      </>)}
    </svg>
  </div>);
}

function PlotCO2CapitaNorm() {
  const [data, setData] = useState(null);
  useEffect(() => {
    Promise.all([
      fetch("top10_co2_countries_per_capita_norm.json")
      // fetch("top_importers.json")
    ]).then((r) => Promise.all(r.map(e => e.json()))).then(([em1, em2]) => {
      setData({
        exporters: em1,
        importers: em2
      })
    });
  }, [])

  const width = 750;
  const height = 300;
  const color = "blue";

  return (<div className="part">
    <svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
      {data && (<>
        <text x="180" y="15" fill="black" font-weight="bold">Top 10 CO2eq contributors / Capita normalized by import-exports</text>
        <BarPlot
          width={width}
          height={height}
          color={interpolateBlues(1)}
          data={data.exporters}
          // xLabel="Some"
          xLabelShift={500}
          yLabel="CO2eq [log(Tonnes / Capita)]"
          rotateXVals={true}
          transform="translate(30, 0)"
        />
        {/* <text x="550" y="15" fill="black" font-weight="bold">Top Importers</text> */}
        {/* <BarPlot
          width={width}
          height={height}
          color={interpolateBlues(1)}
          data={data.importers}
          rotateXVals={true}
          yLabel="Import value [Billion $]"
          transform="translate(450, 0)"
        /> */}
      </>)}
    </svg>
  </div>);
}

export default PartTwo;
