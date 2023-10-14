function ControlWeb() {
    this.mostrarAgregarUsuario = function () {
        let cadena = '<div class="form-group">';
        cadena = cadena + '<label for="nick">Introduce el Nick:</label>';
        cadena = cadena + '<input type="text" id="nick" class="form-control" />';
        cadena = cadena + '<button id="btnAU" type="submit" class="btn btn-primary">Submit</button>';
        cadena = cadena + '</div>';

        $("#au").append(cadena);
        $("#btnAU").on("click", function () {
            let nick = $("#nick").val();
            rest.agregarUsuario(nick);
        });
    };
}


