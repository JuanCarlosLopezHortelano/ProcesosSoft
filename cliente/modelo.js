function Sistema() {
    this.usuarios = {};

    this.usuarioActivo = function(nick) {
        return this.usuarios.hasOwnProperty(nick);
    }
    
    this.agregarUsuario = function(nick) {
        if (!this.usuarioActivo(nick)) {
            this.usuarios[nick] = new Usuario(nick);
            console.log(`Usuario "${nick}" creado.`);
        } else {
            console.log(`Usuario "${nick}" ya Existe.`);
        }
    }

    this.obtenerUsuarios = function() {
        return this.usuarios;
    }

    this.eliminarUsuario = function(nick) {
        if (this.usuarioActivo(nick)) {
            delete this.usuarios[nick];
            console.log(`Usuario "${nick}" eliminado.`);
        } else {
            console.log(`Usuario "${nick}" no encontrado.`);
        }
    }
    this.numeroUsuarios = function() {
        // Contar el número de usuarios (claves) en el objeto usuarios
        return Object.keys(this.usuarios).length;
    }
}
function Usuario(nick) {
    this.nick = nick;
}
