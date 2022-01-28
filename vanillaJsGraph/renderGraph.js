function renderGraph(graph, dataset) {
 
  // remove previous dots and lines so that you can redraw
  graph.selectAll("g.dot-graph").remove();
  graph.selectAll(".line").remove();

  // Create dots
  graph
    .append("g")
    .attr("class", "dot-graph")
    .selectAll("dot")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return xScale(d[0]);
    })
    .attr("cy", function (d) {
      return yScale(d[1]);
    })
    // this changes your dot size
    .attr("r", 3)
    .attr("transform", `translate(${margin / 2},${margin / 2})`)
    .style("fill", lineDotColor);

  // Create a line that connects each dot
  const line = d3
    .line()
    .x(function (d) {
      return xScale(d[0]);
    })
    .y(function (d) {
      return yScale(d[1]);
    })
    // You can change the type of curve connecting the dots
    // http://bl.ocks.org/d3indepth/b6d4845973089bc1012dec1674d3aff8
    .curve(d3.curveLinear);

  // Append the line to your graph 
  graph
    .append("path")
    .datum(dataset)
    .attr("class", "line")
    .attr("transform", `translate(${margin / 2},${margin / 2})`)
    .attr("d", line)
    .style("fill", "none")
    .style("stroke", lineDotColor)
    // this changes your line width
    .style("stroke-width", "2");
}
