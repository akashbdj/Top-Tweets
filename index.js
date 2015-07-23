var Hapi        = require('hapi');
var Twitter     = require('twitter');
var server      = new Hapi.Server();

/*
  Set up Twitter Streaming API Credentials
*/

var twitter = new Twitter({
  consumer_key: 'Your Consumer Key',
  consumer_secret: 'Your Consumer Secret Key ',
  access_token_key: 'You Acces Token Key',
  access_token_secret: 'You Access Token Secret Key'
});


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
  1. Create socket connections!
  2. Make call to Twitter Streaming API
  3. Check for coordinates - they maybe NULL!
  4. Log result!
*/
io.on('connection', function(socket){
  socket.emit("Connected_start_stream");
  socket.on('Start_Streaming', function(){

    twitter.stream('statuses/sample',  function(stream){
      stream.on('data', function(tweet){
        if(tweet.coordinates !== null){ console.log(tweet.coordinates); }
      });

      stream.on('error', function(error) {
        throw error;
      });

    });
  });
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
