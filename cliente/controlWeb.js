function ControlWeb() {
    this.mostrarAgregarUsuario = function () {
        let cadena = '<div class="form-group" id="mAU">';
        cadena = cadena + '<label for="nick">Introduce el Nick:</label>';
        cadena = cadena + '<input type="text" id="nick" class="form-control" />';
        cadena = cadena + '<button id="btnAU" type="submit" class="btn btn-primary">Submit</button>';
        cadena = cadena + '</div>';

        $("#au").append(cadena);
        $("#btnAU").on("click", function () {
            let nick = $("#nick").val();
            rest.agregarUsuario(nick);
        });
    }
     
    this.comprobarSesion=function(){
        let nick=localStorage.getItem("nick");
        if (nick){
        cw.mostrarMensaje("Bienvenido al sistema, "+nick);
        }
        else{
        cw.mostrarAgregarUsuario();
        }
        }

    this.mostrarObtenerUsuarios = function () {
        let cadena = '<div class="form-group" id="mOU">';
        cadena = cadena + '<label for="nick">Usuarios: </label>';
        cadena = cadena + '<button id="btnOU" type="button" class="btn btn-primary">Submit</button>';
        cadena = cadena + '</div';

        $("#ou").append(cadena);

        $("#btnOU").on("click", function () {
            rest.obtenerUsuarios();
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

    this.mostrarMsg = function (msg) {
        let existingMsg = $('#mMsg');
        if (existingMsg.length) {
            existingMsg.remove();
        }

        let cadena = '<h2 id="mMsg">' + msg + '</h2>';
        $('#msg').append(cadena);
    }
}

