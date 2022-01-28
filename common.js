// UI constants
const margin = 100; // https://observablehq.com/@d3/margin-convention
const width = 500;
const height = 400;
const innerWidth = width - margin;
const innerHeight = height - margin;

const lineDotColor = "#CC0056";

// Define the axes bounds
let xAxisMax = 30;
let yAxisMax = 400;

//scales determine the axes domains and the x & y coordinates they map to
let xScale = d3.scaleLinear().domain([0, xAxisMax]).range([0, innerWidth]);
let yScale = d3.scaleLinear().domain([0, yAxisMax]).range([innerHeight, 0]);

