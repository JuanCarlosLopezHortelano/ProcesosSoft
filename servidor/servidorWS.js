function WsServidor(io) {
    this.lanzarServidor = function(io,sistema) {
        io.on('connection', function(socket) {
            console.log("Capa WS activa");
            // Manejo de eventos adicionales aquí
        });
    }
}

module.exports.WsServidor= WsServidor;