function ClienteWS(){
    this.email
    this.socket=undefined;
    this.ini=function(){
        this.socket=io.connect();
    }
   
    this.ini();

    this.crearPartida=function(){
        this.socket.emit("crearPartida",{"email":this.email});
        }
    this.unirAPartida=function(codigo){
            console.log("VA A EMITIR ",this.email, codigo)
            this.socket.emit("unirAPartida",{"email": this.email, "codigo": codigo});
           
        }
    this.socket.on("partidaCreada", function(datos) {
                console.log("Código de la partida creada:", datos.codigo);
                // ws.codigo = datos.codigo;
                // cw mostrar esperando rival
            });
     
    this.socket.on("unidoAPartida", function(datos) {
                console.log("Jugador unido:", datos.email);
                // cw mostrar jugador unido
            });       
  
            
    this.socket.on("listaPartidas", function(lista) {
                console.log("Lista de partidas:", lista);
                // cw mostrarListaPartidas
            });
            
    this.socket.on("error", function(error) {
                console.log("Error:", error.message);
            });;
   
   }