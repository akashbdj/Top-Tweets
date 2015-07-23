var Hapi        = require('hapi');
var Twitter     = require('twitter');
var server      = new Hapi.Server();

/*
    Connect server to listen at port 4000
    http://localhost:4000
*/
server.connection({host: 'localhost', port: 4000});


/*
    'io' is a new instance of socket.io.
    Listener is the node HTTP server
    object for this connection.
*/
var io = require('socket.io')(server.listener);


/*
  Create socket connections!
*/
io.on('connection', function(socket){
  console.log("Connected");
});



/*
  Serve static files. Routing!
*/
server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: 'client',
      listing: true
    }
  }
});


/*
  Start the server and listen to requests!
*/
server.start(function(){
  console.log("Server running at :" + server.info.uri );
});
