var w = 2400, 
    h = 1800;
      
var t0 = Date.now();


// R = orbit radius
// r = planet radius
      var planets = [
        { R: 1397.2, r:  4, speed: .91, phi0: 100},
        { R: 892, r: 4, speed: 1.14, phi0: 300},
        { R: 443.35, r: 4, speed: 1.625, phi0: 300},
        { R: 241.8, r: 4, speed: 2.195, phi0: 300},
        { R: 70.8, r: 4, speed: 4.04, phi0: 300},
        { R: 46.5, r: 4, speed: 5, phi0: 300},
        { R: 33.6, r: 4, speed: 5.9, phi0: 300},
        { R: 18, r: 4, speed: 7.95, phi0: 300},
      ];

      
      var svg = d3.select("#sun_rotation")
                    .insert("svg")
                    .attr("width", w)
                    .attr("height", h)
                    .call(d3.behavior.zoom().on("zoom", function () {
                      svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
                    }))
                    .append("g")

      svg.append("circle")
          .attr("r", 10)
          .attr("cx", w/2)
          .attr("cy", h/2)
          .attr("class", "sun")

      var container = svg.append("g")
                          .attr("transform", "translate(" + w/2 + "," + h/2 + ")")

      container.selectAll("g.planet")
              .data(planets)
              .enter()
              .append("g")
              .attr("class", "planet")
              .each(function(d, i) {
                d3.select(this).append("circle")
                                .attr("class", "orbit")
                                .attr("r", d.R);
                d3.select(this).append("circle")
                                .attr("r", d.r)
                                .attr("cx",d.R)
                                .attr("cy", 0)
                                .attr("class", "planet");
                                });

      d3.timer(function() {
          var delta = (Date.now() - t0);
          svg.selectAll(".planet") 
          .attr("transform", function(d) {
              return "rotate(" + d.phi0 + delta * d.speed/200 + ")";
           });
      });