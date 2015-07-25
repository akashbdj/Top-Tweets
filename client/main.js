(function(){

  /* Make connection request and connect to server*/
  var socket = io.connect("http://localhost:4000");
  var coordinates = [];

  socket.on("Connected_start_stream", function(){
    socket.emit("Start_Streaming");
  });
  socket.on("Sending_Coordinates", function(abc){
    coordinates.push(abc);
  });


  /*  World Map */

  var width   = 1440,
      height  = 1000;

  var svg = d3.select("body").append("svg")
              .attr("width", width)
              .attr("height", height);

  var projection  = d3.geo.mercator().scale(160).translate([width/2, height/2]);
  var path        = d3.geo.path().projection(projection);

  svg.append("rect").attr('width', width).attr('height', height).attr("fill", "#404a67");

  d3.json("world.json", function(error, world) {
    if (error) return console.error(error);

    var worldData = topojson.feature(world, world.objects.world);
    svg.append("path").datum(worldData).attr("d", path).attr("fill", "#8a6886").attr("stroke", "#775e7e");

  });


}());
