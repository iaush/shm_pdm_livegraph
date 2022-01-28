function setupGraph(graph, title, xlabel, ylabel) {
  graph.attr("width", width).attr("height", height);

  // Create title
  graph
    .append("text")
    .attr("x", width / 2)
    .attr("y", 50)
    .attr("class", "title")
    .attr("text-anchor", "middle")
    .text(title);

  // Create x axis label
  graph
    .append("text")
    .attr("class", "axisLabel")
    .attr("x", width / 2)
    .attr("y", height - 10)
    .attr("text-anchor", "middle")
    .text(xlabel);

  // Create y axis label
  graph
    .append("text")
    .attr("class", "axisLabel")
    .attr("text-anchor", "middle")
    .attr('transform', `translate(10,${height/2}) rotate(-90)`)
    .text(ylabel);

  // Create an element to hold the axes 
  const axesContainer = graph.append("g")
    .attr("class", "axesContainer")
    .attr("transform", "translate(" + margin / 2 + "," + margin / 2 + ")");

  // Draw the x and y axes
  axesContainer
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(d3.axisBottom(xScale));

  axesContainer.append("g").attr("class", "axis").call(d3.axisLeft(yScale));
}


function updateaxis(graph) {

  graph.selectAll("g.axis").remove();

  let axesContainer = graph.append("g")
    .attr("class", "axesContainer")
    .attr("transform", "translate(" + margin / 2 + "," + margin / 2 + ")");

  axesContainer
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(d3.axisBottom(xScale));

  axesContainer.append("g").attr("class", "axis").call(d3.axisLeft(yScale));
}