(function () {
  "use strict";

  angular
    .module("Data-Viz-App")
    .controller("OrbitCtrl", OrbitCtrl);

  function OrbitCtrl() {

     var data = {
  sideNotes: [
    'Days Len.', 'Time to Orbit Sun'
     ],
  planetNumbers: [
    {
      label: 'Mercury',
      values: [ 176, .3]
    },
    {
      label: 'Venus',
      values: [ 116, .8]
    },
    {
      label: 'Earth',
      values: [ 1, 1]
    },
    {
      label: 'Mars',
      values: [ 1, 2]
    },
    {
      label: 'Jupiter',
      values: [ .5, 12]
    },
    {
      label: 'Saturn',
      values: [ .5, 29]
    },
    {
      label: 'Uranus',
      values: [ 1, 84]
    },
    {
      label: 'Neptune',
      values: [ 1, 164]
    },
    {
      label: 'Pluto',
      values: [ 6, 248]
    }
    ]

};

// Set up the data to construct the chart
var chartWidth       = 1000,
    barHeight        = 35,
    groupHeight      = barHeight * data.planetNumbers.length,
    space = 40,
    spaceForsideNotes   = 150,
    spaceForLegend   = 100;

// Loop the variables into data for display
var planetData = [];
for (var i=0; i<data.sideNotes.length; i++) {
  for (var j=0; j<data.planetNumbers.length; j++) {
    planetData.push(data.planetNumbers[j].values[i]);
  }
}

// Color scale
var color = d3.scale.category20();
var chartHeight = barHeight * planetData.length + space * data.sideNotes.length;

var x = d3.scale.linear()
    .domain([0, d3.max(planetData)])
    .range([0, 1000]);

var y = d3.scale.linear()
    .range([chartHeight + space, 0]);

var yAxis = d3.svg.axis()
    .scale(y)
    .tickFormat('')
    .tickSize(0)
    .orient("left");

// Specify the chart area and dimensions
var chart = d3.select(".chart")
    .attr("width", spaceForsideNotes + chartWidth + spaceForLegend)
    .attr("height", chartHeight);

// Create bars
var bar = chart.selectAll("g")
    .data(planetData)
    .enter().append("g")
    .attr("transform", function(d, i) {
      return "translate(" + spaceForsideNotes + "," + (i * barHeight + space * (0.5 + Math.floor(i/data.planetNumbers.length))) + ")";
    });

// Create rectangles of the correct width
bar.append("rect")
    .attr("fill", function(d,i) { return color(i % data.planetNumbers.length); })
    .attr("class", "bar")
    .attr("width", x)
    .attr("height", barHeight - 1);

// Add text label in bar
bar.append("text")
    .attr("x", function(d) { return x(d) - 3; })
    .attr("y", barHeight / 2)
    .attr("fill", "red")
    .attr("dy", ".35em")
    .text(function(d) { return d; });

// Draw sideNotes
bar.append("text")
    .attr("class", "label")
    .attr("x", function(d) { return - 10; })
    .attr("y", groupHeight / 2)
    .attr("dy", ".35em")
    .text(function(d,i) {
      if (i % data.planetNumbers.length === 0)
        return data.sideNotes[Math.floor(i/data.planetNumbers.length)];
      else
        return ""});

chart.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + spaceForsideNotes + ", " + -space/2 + ")")
      .call(yAxis);

// Draw legend
var legendRectSize = 28,
    legendSpacing  = 20;

var legend = chart.selectAll('.legend')
    .data(data.planetNumbers)
    .enter()
    .append('g')
    .attr('transform', function (d, i) {
        var height = legendRectSize + legendSpacing;
        var offset = -space/2;
        var horz = spaceForsideNotes + chartWidth + 40 - legendRectSize;
        var vert = i * height - offset;
        return 'translate(' + horz + ',' + vert + ')';
    });

legend.append('rect')
    .attr('width', legendRectSize)
    .attr('height', legendRectSize)
    .style('fill', function (d, i) { return color(i); })
    .style('stroke', function (d, i) { return color(i); });

legend.append('text')
    .attr('class', 'legend')
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text(function (d) { return d.label; });


  }

})();