// Create empty arrays to hold the incoming data
let dataset1 = [],
  dataset2 = [],
  dataset3 = [],
  dataset4 = [];

setupGraph(graph1, "Weight vs chocolate", "# chocolate bars", "weight (kg)");

// Whenever you update your dataset, call renderGraph() with the graph to update + updated dataset 
// example update + renderGraph call
setInterval(function () {
  dataset1.push([counter, Math.random()*180]);
  counter++;
  renderGraph(graph1, dataset1);
}, 2000);