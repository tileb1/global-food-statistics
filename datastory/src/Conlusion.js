import React from 'react';
import logo from './greta_data_story.jpeg'; // Tell Webpack this JS file uses this image

function Conlusion() {
  return (<>
    <div className="part">
      <h2>Conlusion</h2>
      <p>As our game draws to its end, we unfortunately have not been able to identify a sole culprit for the crimes being committed against our planet. However, as we’ve seen in our identification of the usual suspects, there are countries with a particular set of attributes that are especially damaging to the planet. Besides this, along the way we’ve made interesting observations regarding the cost in CO2 emissions that various foods have. Specifically, amongst all of the worrying signs and negativity, we’ve seen that humanity has made noticeable progress with regards to its CO2 efficiency when producing food. Although this is expected, it is somewhat reassuring. Nonetheless, the constantly re-emerging thematic problem is the increase in population. The rapid increase of the world’s inhabitants outweighs any progress that has been made and our numbers are still on the rise. As such, this is a signal that we need to make additional efforts in order to give our planet a chance to survive. For example, reducing our consumption of meat and especially cutting down the amount of food that is wasted are two measures that can have a substantially positive impact on the planet. Hence, in support of Greta’s message to the world, we need to take action and change our current habits in order to alter our seemingly inevitable demise.</p>
      <img src={logo} alt="Logo"/>;
    </div>
  </>);
}

export default Conlusion;
