function ClienteWS(){

    this.socket=io.connect();
    this.socket=undefined;
    this.ini=function(){
   
    }
    this.ini();
     
    this.crearPartida=function(){
        this.socket.emit("crearPartida",{"email":this.email});
        }
   

    this.socket.on("partidaCreada",function(datos){
            console.log(datos.codigo);
            ws.codigo=datos.codigo;
            // cw mostrar esperando rival
            });

    this.unirAPartida=function(codigo){
                this.socket.emit("unirAPartida",{"email":this.email,"codigo":codigo});
                }
            
}
