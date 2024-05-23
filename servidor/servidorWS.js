function WsServidor(io) {
    this.lanzarServidor = function(io,sistema) {

        io.on('connection', (socket) => {
            console.log('Nuevo cliente conectado');

            socket.on('crearPartida', function(datos) {
                let codigo = sistema.crearPartida(datos.email);
                if (codigo != -1) {
                    socket.join(codigo);
                }
                srv.enviarAlRemitente(socket, 'partidaCreada', { 'codigo': codigo });
                let lista = sistema.obtenerPartidasDisponibles();
                srv.enviarATodosMenosRemitente(socket, 'listaPartidas', lista);
            });

            // Otros bloques socket.on para unirAPartida y obtenerPartidasDisponibles
        });
    };
    this.enviarAlRemitente=function(socket,mensaje,datos){
        socket.emit(mensaje,datos);
        }
    this.enviarATodosMenosRemitente=function(socket,mens,datos){
        socket.broadcast.emit(mens,datos);
        }
    this.enviarGlobal=function(io,mens,datos){
        io.emit(mens,datos);
        }
}

module.exports.WsServidor= WsServidor;