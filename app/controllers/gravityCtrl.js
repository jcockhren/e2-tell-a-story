(function () {
	"use strict";

	angular
		.module("Data-Viz-App")
		.controller("GravityCtrl", GravityCtrl);

	function GravityCtrl() {

		var margin = {top: 20, right: 20, bottom: 30, left: 40},
				width = 960 - margin.left - margin.right,
				height = 500 - margin.top - margin.bottom;

		var x = d3.scale.ordinal()
				.rangeRoundBands([0, width], .1);

		var y = d3.scale.linear()
				.range([height, 0]);

		var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom");

		var yAxis = d3.svg.axis()
				.scale(y)
				.orient("left")
				.ticks(10);

		var svg = d3.select("chart").append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
			.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		d3.tsv("app/data/gravity.tsv", type, function(error, data) {
			if (error) throw error;

			x.domain(data.map(function(d) { return d.planet; }));
			y.domain([0, d3.max(data, function(d) { return d.gravity; })]);

			svg.append("g")
					.attr("class", "x axis")
					.attr("transform", "translate(0," + height + ")")
					.call(xAxis);

			svg.append("g")
					.attr("class", "y axis")
					.call(yAxis)
				.append("text")
					.attr("transform", "rotate(-90)")
					.attr("y", 6)
					.attr("dy", ".71em")
					.style("text-anchor", "end")
					.text("Gravity (m/s^2)");

			svg.selectAll(".bar")
					.data(data)
				.enter().append("rect")
					.attr("class", "bar")
					.attr("x", function(d) { return x(d.planet); })
					.attr("width", x.rangeBand())
					.attr("y", function(d) { return y(d.gravity); })
					.attr("height", function(d) { return height - y(d.gravity); });
		});

		function type(d) {
			d.gravity = +d.gravity;
			return d;
		}

	}

})();