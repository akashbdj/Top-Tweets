(function(){
  var socket = io.connect("http://localhost:4000");
  socket.on("Connected_start_stream", function(){
    socket.emit("Start_Streaming");
  });
}());
