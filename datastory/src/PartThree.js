import React, { useState, useEffect } from 'react';
import BarPlot from './BarPlot';

function PartThree() {

  const [data, setData] = useState(null);
  useEffect(() => {
    Promise.all([
      fetch("sector_emissions.json"),
      fetch("sector_emissions.json")
    ]).then((r) => Promise.all(r.map(e => e.json()))).then(([em1, em2]) => {
      setData({
        emissions: em1,
        crap: em2
      })
    });
  }, [])


  const width = 350;
  const height = 300;
  const color = "blue";

  return (<div className="part">
    <h2>PART III: Something something</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris volutpat feugiat dapibus. Maecenas urna ipsum, scelerisque in congue scelerisque, finibus vel lorem. Etiam enim neque, fermentum sit amet nisl in, venenatis condimentum sapien. Maecenas tincidunt, neque a fringilla hendrerit, urna felis dapibus magna, sit amet efficitur enim elit nec nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Quisque mattis fringilla justo eget scelerisque. Fusce finibus rhoncus dui, sit amet sagittis orci commodo eget. Vivamus pulvinar consequat nibh, ac pulvinar nisi imperdiet vitae. Aenean sed eros eu augue efficitur consequat blandit et sapien. Donec suscipit non dolor sit amet dictum. Phasellus facilisis purus et mi hendrerit, eu fringilla lacus placerat. Morbi hendrerit hendrerit lorem et consequat. Pellentesque non nulla felis.</p>
    <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
      {data && (<>
        <BarPlot
          width={width}
          height={height}
          color={color}
          data={data.emissions}
          xLabel="Some"
          xLabelShift={150}
          yLabel="Shit"
          rotateXVals={true}
          transform="translate(30, 00)"
        />
        <BarPlot
          width={width}
          height={height}
          color="#a48"
          data={data.crap}
          transform="translate(450, 0)"
        />
      </>)}
    </svg>
  </div>);
}

export default PartThree;
