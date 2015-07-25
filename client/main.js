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

  var width   = 1000,
      height  = 800;

  var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height);

  d3.json("world.json", function(error, world) {
    if (error) return console.error(error);

    var worldData = topojson.feature(world, world.objects.world);
    var projection = d3.geo.mercator().scale(100).translate([width/2, height/2]);

    var path = d3.geo.path().projection(projection);

    svg.append("path").datum(worldData).attr("d", path).attr("fill", "steelblue").attr("stroke", "#315b7d");

  });


}());
