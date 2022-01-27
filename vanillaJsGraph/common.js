// Define some UI constants
const margin = 100; // https://observablehq.com/@d3/margin-convention
const width = 500;
const height = 400;
const innerWidth = width - margin;
const innerHeight = height - margin;

const lineDotColor = "#CC0000";

// Define the axes bounds
const xAxisMax = 100;
const yAxisMax = 200;

// These scales determine the axes domains and the x & y coordinates they map to
const xScale = d3.scaleLinear().domain([0, xAxisMax]).range([0, innerWidth]);
const yScale = d3.scaleLinear().domain([0, yAxisMax]).range([innerHeight, 0]);

// fake counter as a timer
let counter = 0;

// Select each graph
const graph1 = d3.select("#graph1")
const graph2 = d3.select("#graph1")
const graph3 = d3.select("#graph1")
const graph4 = d3.select("#graph1")