function Sistema() {
    this.usuarios = {};

    this.agregarUsuario = function(nick) {
        this.usuarios[nick] = new Usuario(nick);
    }

    this.obtenerUsuarios = function() {
        return this.usuarios;
    }

    this.usuarioActivo = function(nick) {
        return this.usuarios.hasOwnProperty(nick);
    }

    this.eliminarUsuario = function(nick) {
        if (this.usuarioActivo(nick)) {
            delete this.usuarios[nick];
            console.log(`Usuario "${nick}" eliminado.`);
        } else {
            console.log(`Usuario "${nick}" no encontrado.`);
        }
    }



}

function Usuario(nick) {
    this.nick = nick;
}