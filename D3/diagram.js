const colorin = "#00f";
const colorout = "#f00";
const colornone = "#888";
const width = 800;
const radius = 250;
scale = d3.scaleSqrt().domain([0.001, 6000000]).range([0.6, 1]);

const line = d3.lineRadial()
  .curve(d3.curveBundle.beta(0.85))
  .radius(d => d.y)
  .angle(d => d.x)

const tree = d3.cluster()
  .size([2 * Math.PI, radius - 100])

function hierarchy(data) {
  let root = [{id: "exporters"}];
  let continents = new Set();  
  let countries = new Set();
  data.forEach(d => {
    if (!continents.has(d["Exporter Continent"])) {
      root.push({id: d["Exporter Continent"], parentId: "exporters"});
      continents.add(d["Exporter Continent"]);
    }
    
    if (!continents.has(d["Importer Continent"])) {
      root.push({id: d["Importer Continent"], parentId: "exporters"});
      continents.add(d["Importer Continent"]);
    }
    
    if (!countries.has(d["Exporter"])) {
      root.push({id: d["Exporter"], parentId: d["Exporter Continent"]});
      countries.add(d["Exporter"]);
    }

    if (!countries.has(d["Importer"])) {
      root.push({id: d["Importer"], parentId: d["Importer Continent"]});
      countries.add(d["Importer"]);
    }
  });

  hierarchy = d3.stratify()(root);
  const countryMap = new Map(hierarchy.leaves().map(d => [d.parent.id + "/" + d.id, d]));
  for (const d of hierarchy.leaves()) d.incoming = [], d.outgoing = [];
  data.reverse();
  data.forEach(d => {
    const exporter = countryMap.get(d["Exporter Continent"] + "/" + d["Exporter"]);
    const importer = countryMap.get(d["Importer Continent"] + "/" + d["Importer"]);
    // Only outgoing for now
    if (exporter && importer) {
      const value = d["Value"];
      exporter.outgoing.push({exporter, importer, value});
    }
  });
  return hierarchy;
}

const data = hierarchy(imports_exports);
const root = tree(data.sort((a, b) => d3.ascending(a.height, b.height) || d3.ascending(a.id)));

const svg = d3.select("body").append("svg")
    .attr("viewBox", [-width / 2, -width / 2, width, width]);

const node = svg.append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 6)
  .selectAll("g")
  .data(root.leaves())
  .join("g")
    .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`)
  .append("text")
    .attr("dy", "0.05em")
    .attr("x", d => d.x < Math.PI ? 6 : -6)
    .attr("text-anchor", d => d.x < Math.PI ? "start" : "end")
    .attr("transform", d => d.x >= Math.PI ? "rotate(180)" : null)
    .text(d => d.id)
    .attr("class", "label")
    .each(function(d) { d.text = this; })
    .on("mouseover", overed)
    .on("mouseout", outed)
    .call(text => text.append("title").text(d => `${d.id} ${d.outgoing.length} outgoing`));

const link = svg.append("g")
    .attr("stroke", colornone)
    .attr("fill", "none")
  .selectAll("path")
  .data(root.leaves().flatMap(leaf => leaf.outgoing))
  .join("path")
    .style("mix-blend-mode", "none")
    .style("opacity", 0.3)
    .attr("d", ({exporter, importer}) => line(exporter.path(importer)))
    .each(function(d) { d.path = this; });

function overed(d) {
  d3.select(this).attr("font-weight", "bold");
  d3.selectAll(d.outgoing.map(d => d.path))
    .style("opacity", 1)
    .attr("stroke", d => d3.interpolateBlues(scale(d.value)))
    .raise();
}

function outed(d) {
  d3.select(this).attr("font-weight", null);
  d3.selectAll(d.outgoing.map(d => d.path))
    .style("opacity", 0.3)
    .attr("stroke", null);
}
