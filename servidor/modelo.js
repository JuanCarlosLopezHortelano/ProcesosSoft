const datos=require("./cad.js");
function Sistema() {
    // Objeto que almacena a los usuarios
    this.usuarios = {};

    this.cad=new datos.CAD();
    // Verifica si un usuario está activo
    this.usuarioActivo = function (nick) {
        let res = { "activo": -1 };
        if (nick in this.usuarios) {
            console.log("El nick " + nick + " está activo");
            res.activo = true;
            return res;
        } else {
            console.log("El nick " + nick + " no está activo");
            res.activo = false;
            return res;
        }
    }

    this.cad.conectar(function(db){
        console.log("Conectado a Mongo Atlas");
        });

    // Agrega un usuario al sistema
    this.agregarUsuario = function (nick) {
        let res = { "nick": -1 };
        if (!this.usuarios[nick]) {
            this.usuarios[nick] = new Usuario(nick);
            console.log("El usuario " + nick + " se ha añadido");
            res.nick = nick;
        } else {
            console.log(nick + " está en uso");
        }
        return res;
    }

    // Obtiene la lista de usuarios
    this.obtenerUsuarios = function () {
        return this.usuarios;
    }

    // Elimina un usuario del sistema
    this.eliminarUsuario = function (nick) {
        let res = { "nick": -1 };
        if (this.usuarioActivo(nick)) {
            res.nick = nick;
            return "Usuario eliminado: " + nick;
        } else {
            return "No existe";
        }
    }

    // Obtiene el número de usuarios en el sistema
    this.numeroUsuarios = function () {
        let res = { "num": -1 };
        // Contar el número de usuarios (claves) en el objeto usuarios
        res.num = { "num": Object.keys(this.usuarios).length };
        return res;
    }

    this.usuarioGoogle=function(usr,callback){
        this.cad.buscarOCrearUsuario(usr,function(obj){
        callback(obj);
        });
        }

     this.registrarUsuario=function(obj,callback){
            let modelo=this;
            if (!obj.nick){
            obj.nick=obj.email;
            }
            this.cad.buscarUsuario(obj,function(usr){
            if (!usr){
            modelo.cad.insertarUsuario(obj,function(res){
            callback(res);
            });
            }
            else
            {
            callback({"email":-1});
            }
            });
            }
        
}

function Usuario(nick) {
    this.nick = nick;
}

// Exporta la clase Sistema
module.exports.Sistema = Sistema;
