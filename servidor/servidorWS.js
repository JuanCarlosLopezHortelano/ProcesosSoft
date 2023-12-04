function WSServer(io){
    this.lanzarServer=function(io){
    io.on('connection',function(socket){
    console.log("Capa WS activa");
    });
    }}
    module.exports.WSServer=WSServer;