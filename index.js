var Hapi = require('hapi');
var server = new Hapi.Server();
server.connection({port: 3000});
server.start(function(){
  console.log("Server running at :" + server.info.uri );
});

server.route({
  method: 'GET',
  path: '/',
  handler: function(req, res){
    res('Hello, World');
  }

});
