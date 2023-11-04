function ControlWeb() {

    this.mostrarAgregarUsuario = function () {
        // Crear un formulario
        let cadena = '<div class="form-group" id="mAU">';
        cadena = cadena + '<div class="card"><div class="card-body">';
        cadena = cadena + '<label for="nick">Introduce el Nick:</label>';
        cadena = cadena + '<input type="text" id="nick" class="form-control" />';
        cadena = cadena + '<button id="btnAU" type="submit" class="btn btn-primary">Submit</button>';
        cadena=cadena+'<div><a href="/auth/google"><img src="./cliente/img/web_light_rd_SI@1x.png" style="height:40px;"></a></div>';

        
        cadena = cadena + '</div>';
        cadena = cadena + '</div></div></div>'; 

        // Agregar el formulario al elemento con el ID "au"
        $("#au").append(cadena);
        
        // Manejar el evento de clic del botón "Submit"
        $("#btnAU").on("click", function () {
            let nick = $("#nick").val();
            
            if(nick){
                $("#mAU").remove();

                rest.agregarUsuario(nick);}
        });
    }
     
    
    this.comprobarSesion=function(){
        //let nick=localStorage.getItem("nick");
        let nick=$.cookie("nick");
        if (nick){
        cw.mostrarMsg("Bienvenido al sistema, "+nick);
        }
        else{
        cw.mostrarAgregarUsuario();
        cw.init();
        }
        }
          

        this.init = function() {
                let cw = this;
                google.accounts.id.initialize({
                  client_id: "937465366567-m4lurf473go0f19ou1jrevj7n3oat164.apps.googleusercontent.com", //prod
                  auto_select: false,
                  callback: cw.handleCredentialsResponse
                });
                google.accounts.id.prompt();
              }
              
        this.handleCredentialsResponse=function(response){
                let jwt=response.credential;
                //let user=JSON.parse(atob(jwt.split(".")[1]));
                //console.log(user.name);
                //console.log(user.email);
                //console.log(user.picture);
                rest.enviarJwt(jwt);
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
                    cw.mostrarMensaje(msg);
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

    this.salir = function() {
        // Boton de LogOut
        let cadena = '<div class="form-group" id="mExit">';
        
        cadena = cadena + '<button id="btnExit" type="button" class="btn btn-primary">Cerrar Sesion</button>';
        cadena = cadena + '</div';

        $("#Exit").append(cadena);

        $("#btnExit").on("click", function () {
             // Mostrar un mensaje de confirmación al usuario
            if (confirm("¿Estás seguro de que deseas salir?")) {
                // Si el usuario confirma, eliminar "nick" del localStorage y recargar la página
                $.removeCookie("nick");
                location.reload();
            }
        });

    }


    this.mostrarObtenerUsuarios = function () {
        let cadena = '<div class="form-group" id="mOU">';
        cadena = cadena + '<label for="nick">Usuarios: </label>';
        cadena = cadena + '<button id="btnOU" type="button" class="btn btn-primary">ObtenerUsuarios</button>';
        cadena = cadena + '</div';

        $("#ou").append(cadena);

        $("#btnOU").on("click", function () {
            rest.obtenerUsuarios();
            $("#mOU").remove();
        });
    }

    this.mostrarNumeroUsuarios = function () {
        let cadena = '<div class="form-group" id="mNU">';
        cadena = cadena + '<label for="nick">Numero de Usuarios:</label>';
        cadena = cadena + '<button id="btnNU" type="button" class="btn btn-primary">Pulsa</button>';
        cadena = cadena + '</div';

        $("#nu").append(cadena);

        $("#btnNU").on("click", function () {
            rest.numeroUsuarios();
            $("#mNU").remove();
        });
    }

    this.mostrarUsuarioActivo = function () {
        let cadena = '<div class="form-group" id="mUA">';
        cadena = cadena + '<label for="nick">Introduce el nick para saber si está activo o no:</label>';
        cadena = cadena + '<input type="text" class="form-control" id="nick">';
        cadena = cadena + '<button id="btnUA" type="submit" class="btn btn-primary">¿Esta Activo?</button>';
        cadena = cadena + '</div>';

        $("#ua").append(cadena); // ua = usuario activo

        $("#btnUA").on("click", function () {
            let nick = $("#nick").val();
            rest.usuarioActivo(nick);
            $("#mUA").remove();
        });
    }

    this.mostrarEliminarUsuario = function () {
        let cadena = '<div class="form-group" id="mEU">';
        cadena = cadena + '<label for="nick">Introduce el nick a eliminar:</label>';
        cadena = cadena + '<input type="text" class="form-control" id="nick">';
        cadena = cadena + '<button id="btnEU" type="submit" class="btn btn-primary">Eliminar</button>';
        cadena = cadena + '</div>';

        $("#eu").append(cadena); // eu = eliminar usuario

        $("#btnEU").on("click", function () {
            let nick = $("#nick").val();
            rest.eliminarUsuario(nick);
            $("#mEU").remove();
        });
    }

    this.mostrarMsg=function(msg){

        $('#mMsg').remove()
        let cadena='<h2 id="mMsg">'+msg+'</h2>';
        $('#msg').append(cadena);

    }
}

