(function(){

/*
    Make connection request and connect to server
*/
  var socket = io.connect("http://localhost:4000");
  var coordinates = [];

  socket.on("Connected_start_stream", function(){
    socket.emit("Start_Streaming");
  });
  socket.on("Sending_Coordinates", function(abc){
    coordinates.push(abc);
  });



/*
    World Map!
*/

  var width  = 3500,
      height = 3000;

  var canvas = d3.select("body").append("svg")
               .attr("width", width)
               .attr("height", height);

/*
  It shows the type of projection of the map,
  we're using 'mercator' which is kind of FLAT REPRESTATION
*/
  var projection  = d3.geo.mercator().scale(500).translate([width/2, height/2]);
  var path        = d3.geo.path().projection(projection);

  d3.json("countries.topo.json", function(countries){

   var countriesData = topojson.feature(countries, countries.objects.countries).features;

   var group = canvas.selectAll("g")
                      .data(countriesData)
                      .enter()
                      .append("g");

/*
  add class to each country path and class name = country name
*/
  group.append("path")
        .attr("class", function(d) { return d.properties.name; })
        .attr("fill", "#8a6886")
        .attr("d", path);

/*
  Show country names on the map
*/
  group.append("text")
        .attr("x", function(d){ return path.centroid(d)[0];})
        .attr("y", function(d){ return path.centroid(d)[1];})
        .attr("fill", "#fff")
        .text(function(d) { return d.properties.name; });
  });

}());
