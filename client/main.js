(function(){

/*
    Make connection request and connect to server
*/
  var socket            = io.connect("http://localhost:4000");
  var coordinatesArray  = [];

  socket.on("Connected_start_stream", function(){
    socket.emit("Start_Streaming");
  });

  socket.on("Sending_Coordinates", function(cordi){
    getCoordinatesArray(cordi);
  });



/* ------- World Map generation starts here -------- */

var showOnMap = function(){

  var width  = 1440,
      height = 1000;

  var canvas = d3.select("body").append("svg")
                  .attr("width", width)
                  .attr("height", height);

/*
    It shows the type of projection of the map,
    we're using 'mercator' which is kind of FLAT REPRESTATION
*/
  var projection  = d3.geo.mercator().scale(160).translate([width/2, height/2]);
  var path        = d3.geo.path().projection(projection);
  var g           = canvas.append("g");

/*
    Read "countries,topo.json" file and plot the map!
*/

  d3.json("countries.topo.json", function(countries){

    var countriesData = topojson.feature(countries, countries.objects.countries).features;
    g.selectAll("path")
      .data(countriesData)
      .enter()
      .append("path")
      .attr("class", function(d){ return d.properties.name;})
      .attr("fill", "#8a6886")
      .attr("d", path);

    // Show circle at the place where tweets are created!
    g.selectAll("circle")
      .data(coordinatesArray)  // coordinatesArray contains tweets locations.
      .enter()
      .append("circle")
      .attr("class", function(d)  { return d.coordinates; })
      .attr("cx", function(d) {
        return projection([d.coordinates[0], d.coordinates[1]])[0];
      })
     .attr("cy", function(d) {
        return projection([d.coordinates[0], d.coordinates[1]])[1];
      })
     .attr("r", 6)
     .style("fill", "#f1f2f9");

  });
};

/*
  -----------  World Map generation ends here -----------------
*/


/*
  Consume Coordinates from Twitter Streaming API
*/
  function getCoordinatesArray(cordi){
    coordinatesArray.push(cordi);
    // ToDo: Change it! Make it work for time duration
    if(coordinatesArray.length === 30){
      showOnMap();
    }
  }

}());
