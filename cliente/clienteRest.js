function ClienteRest() {
    
    this.agregarUsuario=function(nick){
        var cli=this;
        $.getJSON("/agregarUsuario/"+nick,function(data){
        let msg="El nick "+nick+" está ocupado";
        if (data.nick!=-1){
        console.log("Usuario "+nick+" ha sido registrado");
        msg="Bienvenido al sistema1, "+nick;
        $.cookie("nick", nick);
        ws.email = nick
        
        }
        else{
        console.log("El nick esta en uso");
        msg="El nick esta en uso"
        }
        cw.mostrarMsg(msg);
        });
    }
    
    this.agregarUsuario2 = function(nick) {
        $.ajax({
            type: 'GET',
            url: '/agregarUsuario/' + nick,
            success: function(data) {
                if (data.nick != -1) {
                    console.log("Usuario " + nick + " ha sido registrado");
                } else {
                    console.log("El nick ya está ocupado");
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                console.log("Error al realizar la solicitud.");
                console.log("Estado: " + textStatus);
                console.log("Error: " + errorThrown);
            }
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



    // Registro de usuario
    this.registrarUsuario=function(email,password){
        
		$.ajax({
		type:'POST',
		url:'/registrarUsuario',
		data: JSON.stringify({"email":email,"password":password}),
		success: function(data){

				if (data.nick!==-1){				
					console.log("Usuario "+data.nick+" ha sido registrado");
                    
					cw.mostrarLogin();
				}
				else{
                    cw.limpiar()
					cw.mostrarMsg("El nick está ocupado");

                    cw.mostrarMsg("Hay un usuario registrado con ese email");
                    cw.mostrarModal("No se ha podido registrar el usuario");
                    

				} },
            error: function (xhr, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
                cw.mostrarMsg("ERROR");
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
                    if (data.nick) {
                        console.log("Inicio de sesión exitoso para " + data.nick);

                        $.cookie("nick", data.nick);
                        ws.email=data.nick;

                        cw.limpiar();
                        cw.mostrarMsg("Datanick" + ws.email)
                        cw.mostrarMsg("Datanick" + data.nick)
                        cw.mostrarMsg("Bienvenido de nuevo22, " + data.nick);
                        cw.limpiar();
                        
                        cw.mostrarMenuPartidas();
                        console.log("AQUIIIIi")
                        

                    } else {
                        cw.limpiar()
                        console.log("Credenciales incorrectas o usuario no registrado");
                        cw.mostrarModal("Inicio de sesion fallido");

                    }

                    
                },
                error: function(xhr, textStatus, errorThrown) {
                    console.log("Error al realizar la solicitud.");
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
                ws.email = data.nick;
                msg="Bienvenido al sistemaaaa, " +ws.email;
                $.cookie("nick",data.nick);
                ws.email=data.nick;

                
                cw.limpiar();
                cw.mostrarMsg(msg);
                cw.limpiar();
                cw.mostrarMenuPartidas();
                console.log("AQUIIIIi")
            }
            else{
                console.log("El nick ya está ocupado");
            }
        
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




