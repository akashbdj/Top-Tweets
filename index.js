var Hapi        = require('hapi');
var Twitter     = require('twitter');
var server      = new Hapi.Server();

server.connection({host: 'localhost', port: 4000});


server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: 'client'
    }
  }
});


server.start(function(){
  console.log("Server running at :" + server.info.uri );
});
