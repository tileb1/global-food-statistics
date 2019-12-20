// import React from 'react';
// import ImportExportPlot from './ImportExportPlot';
import React, { useState, useEffect } from 'react';
import { interpolateBlues } from 'd3';
import BarPlot from './BarPlot';

function PartTwo() {
  return (<div className="part">
    <h2>Crime scene investigation</h2>
    <p>As we have now established that a felony has been (or is being) committed, we aim to further investigate the crime scene. Particularly, from a nutritional point of view, we will examine what are the potential weapons (i.e. food types) used by the perpetrators (i.e. humanity) that have inflicted or are inflicting most damage to the planet and their level of implication.</p>
    <p>Before delving into the various food types, we’re interested in actually seeing how much responsibilities the agricultural sector bears in terms of green house gas emissions. Below we plot the CO2-equivalent emissions by sector.</p>
    <PlotEmissions/>
    <p>We can observe that the agricultural sector’s emissions comes in fourth place. However, it is worth noting that the emissions attributed to the agricultural sector originate solely from the following: enteric fermentation, manure management, rice cultivation, synthetic fertilisers, manure applied to soils, manure left on pasture, crop residues and burning-crop residues. Therefore, even though the contribution of the agricultural sector to CO2 emissions seems to be undermined by those of Energy and Transport, the emissions that are truly caused by agriculture would be of a greater value than the one plotted above. This is due to the fact that a sizeable portion of CO2 emissions in both the Energy and Transport sectors are actually because of agriculture since agricultural activity induces the consumption of energy but also because food is hugely imported and exported across the world (we explore this point further later on).</p>
    <p>Now that curiosity’s gotten the better of us, we look into what are the most and least devastating food types in terms of CO2 emitted. As we all know a vegetarian or a vegan person (or are one ourselves), you probably already heard that the killer food is meat. In order to verify this statement we plot both the proportion of total production that each food type represents and the proportion of total agricultural CO2 emissions that each food type is responsible for. Food types are divided between the following main raw foods: meats, milks and rice/cereals. We plot both below.</p>
    <PlotProduction/>
    <p>Unfortunately for all the meat lovers out there and to the delight of all vegetarians and vegans (for the sake of winning arguments), the striking observation we can make from the above plots is that meat is indeed extremely bad for the environment (compared to other foods). Even though it only represents roughly 7% of food production, it is responsible for over half of the CO2 equivalent emissions cause by agriculture. So you better start considering meat-less options more frequently for your meals. Although meat is bad for the environment, its production quantity is negligible in comparison to rice or cereals. This is mostly due to the fact that meat is generally more expensive and hence not as accessible to everyone such as its alternatives. One could potentially presume that our food production processes are simply inefficient in terms of greenhouse gas emissions. To explore this in more detail, we plot below the evolution of kilograms of CO2 equivalent emissions per kilogram produced of each food type.</p>
    <p>In a more positive light, we can see that the efficiency of food production in terms of green house gas emissions has actually improved over time generally across all food types (including meat).  So although agricultural CO2 emissions are increasing due to rising population levels, we are making progress in terms of emission intensities.</p>
    {/* <ImportExportPlot/> */}
  </div>);
}

function PlotEmissions() {
  const [data, setData] = useState(null);
  useEffect(() => {
    Promise.all([
      fetch("sector_emissions.json")
    ]).then((r) => Promise.all(r.map(e => e.json()))).then(([em1, em2]) => {
      setData({
        emissions: em1,
        crap: em2
      })
    });
  }, [])

  const width = 750;
  const height = 300;
  const color = "blue";

  return (<div className="part">
    <svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg">
      {data && (<>
        <text x="350" y="15" fill="black" font-weight="bold">Emissions per sector</text>
        <BarPlot
          width={width}
          height={height}
          color={interpolateBlues(1)}
          data={data.emissions}
          // xLabel="Some"
          xLabelShift={150}
          yLabel="CO2 [GTonnes]"
          rotateXVals={true}
          transform="translate(30, 00)"
        />
      </>)}
    </svg>
  </div>);
}

function PlotProduction() {
  const [data, setData] = useState(null);
  useEffect(() => {
    Promise.all([
      fetch("foodtype_2016_emissions_gigagrams.json"),
      fetch("foodtype_2016_production_tonnes.json")
    ]).then((r) => Promise.all(r.map(e => e.json()))).then(([em1, em2]) => {
      setData({
        emissions: em1,
        productions: em2
      })
    });
  }, [])

  const width = 300;
  const height = 300;
  const color = "blue";

  return (<div className="part">
    <svg viewBox="0 0 800 320" xmlns="http://www.w3.org/2000/svg">
      {data && (<>
        <text x="120" y="15" fill="black" font-weight="bold">Emissions per food type</text>
        <BarPlot
          width={width}
          height={height}
          data={data.emissions}
          color={interpolateBlues(1)}
          xLabelShift={150}
          yLabel="CO2eq [GTonnes]"
          // rotateXVals={true}
          transform="translate(30, 00)"
        />
        <text x="520" y="15" fill="black" font-weight="bold">Production per food type</text>
        <BarPlot
          width={width}
          height={height}
          yLabel="Weight [GTonnes]"
          color={interpolateBlues(1)}
          data={data.productions}
          transform="translate(450, 0)"
        />
      </>)}
    </svg>
  </div>);
}


export default PartTwo;
