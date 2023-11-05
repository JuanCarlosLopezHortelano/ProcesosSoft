function ClienteRest() {
    
    this.agregarUsuario=function(nick){
        var cli=this;
        $.getJSON("/agregarUsuario/"+nick,function(data){
        let msg="El nick "+nick+" está ocupado";
        if (data.nick!=-1){
        console.log("Usuario "+nick+" ha sido registrado");
        msg="Bienvenido al sistema, "+nick;
        $.cookie("nick", nick);
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
        var cli=this;
        $.getJSON("/usuarioActivo/" + nick, function (data) {
            if (data.nick !== -1) {
                console.log("Usuario " + nick + " Existe");
            } else {
                console.log("El nick no existe");
            }
        });
    };

  

    this.registrarUsuario=function(email,password){
        $.ajax({
        type:'POST',
        url:'/registrarUsuario',
        data: JSON.stringify({"email":email,"password":password}),
        success:function(data){
        if (data.nick!=-1){
        console.log("Usuario "+data.nick+" ha sido registrado");
        //$.cookie("nick",data.nick);
        cw.limpiar();
        cw.mostrarMsg("Bienvenido al sistema,"+data.nick);
        cw.mostrarLogin();
        }
        else{
        console.log("El nick está ocupado");
        }
        },
        error:function(xhr, textStatus, errorThrown){
        console.log("Status: " + textStatus);
        console.log("Error: " + errorThrown);
        },
        contentType:'application/json'
        });
        }


        this.loginUsuario = function(email, password) {
            $.ajax({
                type: 'POST',
                url: '/loginUsuario', 
                data: JSON.stringify({ "email": email, "password": password }),
                success: function(data) {
                    if (data.nick !== -1) {
                        console.log("Inicio de sesión exitoso para " + data.nick);
                        $.cookie("nick", data.nick);
                        cw.limpiar();
                        cw.mostrarMsg("Bienvenido de nuevo, " + data.nick);
                        
                    } else {
                        console.log("Credenciales incorrectas o usuario no registrado");
                    }
                },
                error: function(xhr, textStatus, errorThrown) {
                    console.log("Status: " + textStatus);
                    console.log("Error: " + errorThrown);
                },
                contentType: 'application/json'
            });
        }

        this.cerrarSesion=function(){
            $.getJSON("/cerrarSesion",function(){
            console.log("Sesión cerrada");
            $.removeCookie("nick");
            });
            }


   this.enviarJwt=function(jwt){
    $.ajax({
        type:'POST',
        url:'/enviarJwt',
        data: JSON.stringify({"jwt":jwt}),

        success:function(data){
            let msg="El nick "+nick+" está ocupado";
            if (data.nick!=-1){
                console.log("Usuario "+data.nick+" ha sido registrado");
                msg="Bienvenido al sistema, "+data.nick;
                $.cookie("nick",data.nick);
            }
            else{
                console.log("El nick ya está ocupado");
            }
            cw.limpiar();
            cw.mostrarMsg(msg);
        },
        error:function(xhr, textStatus, errorThrown){
            //console.log(JSON.parse(xhr.responseText));
            console.log("Status: " + textStatus);
            console.log("Error: " + errorThrown);
        },
        contentType:'application/json'
    
        //dataType:'json'
    });
    }

        }




