
var w = screen.width,
    h = screen.height,
    fill = d3.scale.category20();

var vis = d3.select("#chart")
  .append("svg")
    .attr("width", w)
    .attr("height", h);

d3.json("js.json", function(json) {
  var force = d3.layout.force()
      .charge(-120)
      .linkDistance(30)
      .nodes(json.nodes)
      .links(json.links)
      .size([w, h])
      .start();

  var link = vis.selectAll("line.link")
      .data(json.links)
    .enter().append("svg:line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return Math.sqrt(d.value); })
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  var node = vis.selectAll("circle.node")
      .data(json.nodes)
    .enter().append("path")
      .attr("class", "node")
      .attr("d", d3.svg.symbol()
        .size(300)
        .type(function(d) { return d3.svg.symbolTypes[d.s]; }))
      .style("fill", function(d) { return d.group; })
      .style("stroke", "white")
      .style("stroke-width", "1.5px")
      .call(force.drag);

  
  node.append("svg:title")
      .text(function(d) { return d.name; });

  vis.style("opacity", 1e-6)
    .transition()
      .duration(1000)
      .style("opacity", 2);

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";})
  });
});
