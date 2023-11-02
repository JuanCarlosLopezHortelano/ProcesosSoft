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
        console.log("El nick esta en uso");
        msg="El nick esta en uso"
        }
        cw.mostrarMsg(msg);
        });
    }
    
    this.agregarUsuario2=function(nick){
        $.ajax({
            type:'GET',
            url:'/agregarUsuario/'+nick,
            success:function(data){
            if (data.nick!=-1){
            console.log("Usuario "+nick+" ha sido registrado")
            }
            else{
            console.log("El nick ya está ocupado");
            }
            },
            error:function(xhr, textStatus, errorThrown){
            console.log("Status: " + textStatus);
            console.log("Error: " + errorThrown);
            },
            contentType:'application/json'
            });
    }

    this.obtenerUsuarios = function () {
        var cli=this;
        $.getJSON("/obtenerUsuarios/", function (data) {
            console.log(data);
        });
    };

    this.numeroUsuarios = function () {
        var cli=this;
        $.getJSON("/numeroUsuarios/", function (data) {
            console.log(data);
        });
    };

    this.eliminarUsuario = function (nick) {
        var cli=this;
        $.getJSON("/eliminarUsuario/" + nick, function (data) {
            if (data.nick !== -1) {
                console.log("Usuario " + nick + " ha sido eliminado");
            } else {
                console.log("El nick ya está eliminado o no existe");
            }
        });
    };
    

    this.usuarioActivo = function (nick) {
        var cli=this;
        $.getJSON("/usuarioActivo/" + nick, function (data) {
            if (data.nick !== -1) {
                console.log("Usuario " + nick + " Existe");
            } else {
                console.log("El nick no existe");
            }
        });
    };



}

