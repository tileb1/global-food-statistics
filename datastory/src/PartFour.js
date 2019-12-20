import React from 'react';

function PartFour() {
  return (<>
    <div className="part">
      <h2>The usual suspects</h2>
      <p>At this point, we aim to get a sketch of the usual suspects. To this end we selected a set of descriptive features for each country. The features were chosen in order to provide a rough picture of the type of agricultural activity that occurs in a given country. An example of such features is the amount of beef produced. As the number of features is too high to be easily visualized, the t-SNE algorithm comes to rescue. The latter aims at representing a high dimensional object in a latent space of lower dimensionality under the constraint that points close to each other in the original space should also be close to each other in the latent space. To assess the quality of the selected features, we additionaly represented the amount of agricultural CO2eq emissions as the size of the points.</p>
      {/* !!!!!!!!!!!!!!!TODO IVAN: ADD SCATTER PLOT!!!!!!!!!!!!!!! */}
      <p>From the above scatter plot, we notice that countries with large CO2 emissions emanating from the agricultural sector have a tendency to cluster together. This means that these countries share similar characteristics in terms of their agricultural activity. We see that these countries include: China, USA, India, Russia, Brazil, Argentina, France, Canada, Germany and others. It is apparent that all these countries are all somewhat economically developed and produce large amounts of food. However, it is worth noting that we do not have clear clusters emerging as there are no deterministic boundaries between being a country that exports a lot or that relies heavily on imports. This explains the kind of continuum we observe.</p>
    </div>
  </>);
}

export default PartFour;
