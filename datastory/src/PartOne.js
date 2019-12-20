import React from 'react';
import AllCountriesPlot from './AllCountriesPlot';

function PartOne() {
  return (<>
    <div className="part">
      <p>As Greta Thunberg recently elicited during her speech at the U.N. Climate Action Summit: “People are suffering. People are dying. Entire ecosystems are collapsing. We are in the beginning of a mass extinction”. In an attempt to assist her in efforts to spread awareness, this article will take a more lighthearted approach in taking a closer look at the ways humanity sustains its nutritional needs and the impact it bears on the planet. Specifically, we will be tackling the topic in game-like manner, similar to the murder mystery game Cluedo.</p>
    </div>
    <div className="part">
      <h2>PART I: Is the planet dying?</h2>
      <p>First things first, as in any murder mystery game, we must have a victim. Unfortunately, in our case it is the planet itself. This shouldn’t come as a surprise, since being able to sustain its needs in an eco-friendly manner is one of humanity’s greatest challenges today. The reason being is that human activities, generally speaking, have a devastating effect on the planet and this is most notably seen through the effect of global warming that is caused by rising green house gas emissions. One well known and apparent cause for increased emissions is the substantial growth in population across the globe. Particularly with regards to nutrition, our rising numbers imply that we need to produce a larger quantity of food with a set of limited resources. To makes things worse, the escalation of food production, which in itself is a source of green house gas emissions, requires to cut down the sole counter balancing factor to CO2, that are trees. As these are facts that are merely just spoken of (for most), we aim to substantiate these claims by plotting, both at a worldwide and country level, the evolution over the last half century of population, temperature, agricultural CO2 emissions, and carbon stock (the latter being a unit measuring the living biomass’s ability to absorb carbon).</p>
      <AllCountriesPlot/>
      <p>Considering the fact that all of the data plotted above is only over a timespan of half a century, we can confirm and conclude several things. First of all, the increase in population is indeed worrying to say the least. The world population has more than doubled in just over 50 years, and if the number of inhabitants of the world continues to increase at similar rate that it has this would cause major problems. Looking at the map illustrating the population levels, we can observe that most of the population is concentrated in China and India (as you probably already know) but also that the population levels in Africa have generally increased since the 1960s. Secondly, it is apparent that climate change is real. The plot illustrates the difference in temperature compared to the average temperature over the 30-year period 1951-1980 for the respective location. We can observe that since then, temperatures have increased in the world across all countries. It is worth noting that the increasing trend in temperature could potentially be observed from a much earlier period (if the data allowed it) due to rising CO2 emissions that notably begun during the industrial revolution. Finally, although not as apparent, we can also observe that the world’s ability to absorb CO2 is decreasing while CO2 emissions are increasing. These changes, albeit relatively slight, in combination with rising population levels are more daunting than it seems. </p>
    </div>
  </>);
}

export default PartOne;
