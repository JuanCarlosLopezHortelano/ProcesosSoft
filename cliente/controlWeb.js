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

                rest.agregarUsuario2(nick);}
        });
    }
    this.mostrarGoogle = function () {

        
        // Crear un botón de Google para iniciar sesión
        let botonGoogle = '<div class="text-center"><a href="/auth/google"><img src="./cliente/img/web_light_rd_SI@1x.png" style="height:40px;"></a></div>';
        
        // Agregar el botón de Google después del formulario de inicio de sesión
        $("#google").append(botonGoogle);
    }

    
    this.comprobarSesion=function(){
        //let nick=localStorage.getItem("nick");
        let nick=$.cookie("nick");
        if (nick){
        cw.mostrarMsg("Bienvenido al sistema, "+nick);
        }
        else{
        cw.mostrarRegistro();
        // cw.init();
        }
        }


        this.init = function() {
                let cw = this;
                google.accounts.id.initialize({
                //PRODUCCIOn
               // client_id: "937465366567-5qcj9vucp1pah0muucdkfkpsv2pe2ls5.apps.googleusercontent.com", 
                client_id: "937465366567-m4lurf473go0f19ou1jrevj7n3oat164.apps.googleusercontent.com", 
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

    // Función para agregar el botón
this.agregarBotonExit = function() {
        let cadena = '<div class="form-group" id="mExit">';
        cadena += '<button id="btnEx" type="button" class="btn btn-primary">Cerrar Sesion</button>';
        cadena += '</div>';
        $("#Exit").append(cadena);
        $("#btnEx").on("click", function () {
            // Mostrar un mensaje de confirmación al usuario
            if (confirm("¿Estás seguro de que deseas salir?")) {
                // Si el usuario confirma, eliminar "nick" del localStorage y recargar la página
                $.removeCookie("nick");
                location.reload();
                rest.cerrarSesion();
            }
        });
    }
    this.mostrarModal=function(m){
        $("#msg").remove();
        let cadena="<div id='msg'>"+m+"</div>";
        $('#mBody').append(cadena)
        $('#miModal').modal();
 // $('#btnModal').on('click',function(){
 // })
 }

    

$(document).ready(function () {
        
        $("#btnExit").on("click", function () {
            // Mostrar un mensaje de confirmación al usuario
            if (confirm("¿Estás seguro de que deseas salir?")) {
                // Si el usuario confirma, eliminar "nick" del localStorage y recargar la página
                $.removeCookie("nick");
                location.reload();
                rest.cerrarSesion();
            }
        });
    });
    


    this.limpiar = function(){
        $("#au").remove();
        $("#registro").remove();
        $("#google").remove();
        $("#fmRegistro").remove();
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

    this.mostrarModal=function(m){
        $("#msg").remove();
        let cadena="<div id='msg'>"+m+"</div>";
        $('#mBody').append(cadena)
        $('#miModal').modal();
        // $('#btnModal').on('click',function(){
        // })
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
        this.agregarBotonExit();
    }

    this.mostrarRegistro=function(){
        if ($.cookie('nick')){
            return true;
        };
        
        
        $("#fmRegistro").remove();
        $("#registro").load("./cliente/registro.html",function(){
            $("#btnRegistro").on("click",function(){
                let email=$("#email").val();
                let pwd=$("#pwd").val();
                if (email && pwd){
                    console.log("Email: " + email + " Password: " + pwd)
                    rest.registrarUsuario(email,pwd);
                    
                }
            });
        });
    }

    

        this.mostrarLogin = function() {
            if ($.cookie('nick')) {
                return true;
            }
            
            $("#fmRegistro").remove();

            $("#registro").load("./cliente/login.html", function() {
                // This code is executed after loading the login form.
                 // Logging the message when the button is clicked.
        
                $("#btnLogin").on("click", function(event) {
                    event.preventDefault();

                    let email = $("#usuarioLogin").val();
                    let pwd = $("#pwdLogin").val();
                    if (email && pwd) {
                        
                        console.log("Email: " + email + " Password: " + pwd);
                        rest.loginUsuario(email, pwd);
                    }

                    
                });
            });
        }
        
        this.mostrarMenuPartidas = function() {
            if ($.cookie('nick')) {
                return true;
            }
            
            $("#fmRegistro").remove();

            $("#registro").load("./menupartidas.html", function() {
        
                $("#btnUnirPartida").on("click", function(event) {
                    event.preventDefault();

                    let codigoPartida = $("#btnUnirPartida").val();
                    
                    if (codigoPartida) {
                        
                        console.log("codigoPartida: " + codigoPartida );
                        rest.menuPartidaUnirse(codigoPartida);
                    }

                    
                });

                $("#btnCrearPartida").on("click", function(event) {
                
                    console.log("Partida creada" );
                    rest.menuPartidaCrear();

                });
            });
        }

        this.mostrarFormulario = function(formularioId) {

            if (formularioId === 'fmRegistro') {
                // Muestra el formulario de registro
                this.mostrarRegistro()
            } else if (formularioId === 'fmLogin') {
                // Muestra el formulario de inicio de sesión
                this.mostrarLogin()
                
                 // Para que permita loguearse con google
                //this.mostrarGoogle() 
            } else {
                // Mostrar un mensaje de error si el formulario no es válido

                console.log('Formulario no válido');
            }
        }



}

