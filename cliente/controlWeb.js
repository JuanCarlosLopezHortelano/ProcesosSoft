function ControlWeb() {

    this.mostrarAgregarUsuario = function () {
        // Crear un formulario
        let cadena = '<div class="form-group" id="mAU">';
        cadena = cadena + '<label for="nick">Introduce el Nick:</label>';
        cadena = cadena + '<input type="text" id="nick" class="form-control" />';
        cadena = cadena + '<button id="btnAU" type="submit" class="btn btn-primary">Submit</button>';
        cadena = cadena + '</div>';
        
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
     
    
    this.comprobarSesion = function () {
        // Recupera el valor almacenado en LocalStorage con la clave "nick".
        let nick = localStorage.getItem("nick");

        // Verifica si se encontró un valor en LocalStorage.
        if (nick) {
           
            cw.mostrarMensaje("Bienvenido al sistema, " + nick);
        } else {
            // Si no se encontró un valor, muestra un formulario para agregar un usuario.
            cw.mostrarAgregarUsuario();
        }
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

