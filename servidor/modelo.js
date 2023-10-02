function Sistema() {
    this.usuarios = {};

    this.usuarioActivo = function(nick) {
        const resultado = { "Activo": this.usuarios.hasOwnProperty(nick) };
        return resultado ;
    }
    
    this.agregarUsuario=function(nick){
        let res={"nick":-1};
        if (!this.usuarios[nick]){
        this.usuarios[nick]=new Usuario(nick);
        res.nick=nick;
        }
        else{
        console.log("el nick "+nick+" está en uso");
        }
        return res;}


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
        let res = {"num":Object.keys(this.usuarios).length};
        return res;
    }

   
}
function Usuario(nick) {
    this.nick = nick;
}

module.exports.Sistema=Sistema;