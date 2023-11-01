function ClienteRest() {
    
    this.agregarUsuario=function(nick){
        var cli=this;
        $.getJSON("/agregarUsuario/"+nick,function(data){
        let msg="El nick "+nick+" está ocupado";
        if (data.nick!=-1){
        console.log("Usuario "+nick+" ha sido registrado");
        msg="Bienvenido al sistema, "+nick;
        localStorage.setItem("nick",nick);
        }
        else{
        console.log("El nick ya está ocupado");
        }
        cw.mostrarMensaje(msg);
        });

    this.obtenerUsuarios = function () {
        $.getJSON("/obtenerUsuarios/", function (data) {
            console.log(data);
        });
    };

    this.numeroUsuarios = function () {
        $.getJSON("/numeroUsuarios/", function (data) {
            console.log(data);
        });
    };

    this.eliminarUsuario = function (nick) {
        $.getJSON("/eliminarUsuario/" + nick, function (data) {
            if (data.nick !== -1) {
                console.log("Usuario " + nick + " ha sido eliminado");
            } else {
                console.log("El nick ya está eliminado o no existe");
            }
        });
    };
    

    this.usuarioActivo = function (nick) {
        $.getJSON("/usuarioActivo/" + nick, function (data) {
            if (data.nick !== -1) {
                console.log("Usuario " + nick + " Existe");
            } else {
                console.log("El nick no existe");
            }
        });
    };



}
}
