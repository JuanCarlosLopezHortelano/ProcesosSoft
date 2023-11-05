const datos = require("./cad.js");

function Sistema() {
    // Objeto que almacena a los usuarios
    this.usuarios = {};

    // Conexión a la base de datos
    this.cad = new datos.CAD();

    // Verifica si un usuario está activo
    this.usuarioActivo = function (nick) {
        if (nick in this.usuarios) {
            return { "activo": true };
        } else {
            return { "activo": false };
        }
    }

    // Conectar a la base de datos
    this.cad.conectar(function (db) {
        console.log("Conectado a Mongo Atlas");
    });

    // Agrega un usuario al sistema
    this.agregarUsuario = function (nick) {
        if (!this.usuarios[nick]) {
            this.usuarios[nick] = new Usuario(nick);
            return { "nick": nick };
        } else {
            console.log(nick + " está en uso");
            return { "nick": -1 };
        }
    }

    // Obtiene la lista de usuarios
    this.obtenerUsuarios = function () {
        return this.usuarios;
    }

    // Elimina un usuario del sistema
    this.eliminarUsuario = function (nick) {
        if (this.usuarioActivo(nick)) {
            return "Usuario eliminado: " + nick;
        } else {
            return "No existe";
        }
    }

    // Obtiene el número de usuarios en el sistema
    this.numeroUsuarios = function () {
        return { "num": Object.keys(this.usuarios).length };
    }

    // Autenticación de usuario utilizando Google
    this.usuarioGoogle = function (usr, callback) {
        this.cad.buscarOCrearUsuario(usr, function (obj) {
            callback(obj);
        });
    }

    // Registro de usuario
    this.registrarUsuario = function (obj, callback) {
        let modelo = this;
        if (!obj.nick) {
            obj.nick = obj.email;
        }
        this.cad.buscarUsuario(obj, function (usr) {
            if (!usr) {
                modelo.cad.insertarUsuario(obj, function (res) {
                    callback(res);
                });
            } else {
                callback({ "email": -1 });
            }
        });
    }

    // Inicio de sesión de usuario
    this.loginUsuario = function (obj, callback) {
        this.cad.buscarUsuario({ "email": obj.email, "confirmada": true }, function (usr) {
            if (usr && usr.password === obj.password) {
                callback(usr);
            } else {
                callback({ "email": -1 });
            }
        });
    }

    this.registrarUsuario=function(obj,callback){
        let modelo=this;
        if (!obj.nick){
        obj.nick=obj.email;
        }
        this.cad.buscarUsuario(obj,function(usr){
        if (!usr){
        //el usuario no existe, luego lo puedo registrar
        obj.key=Date.now().toString();
        obj.confirmada=false;
        modelo.cad.insertarUsuario(obj,function(res){
        callback(res);
        });
        //correo.enviarEmail(obj.email,obj.key,"Confirmar cuenta");
        correo.enviarEmail("juancarloslhhellin@gmail.com",obj.key,"Confirmar cuenta");
        }
        else
        {
        callback({"email":-1});
        }
        });
        }

        this.confirmarUsuario=function(obj,callback){
            let modelo=this;
            this.cad.buscarUsuario({"email":obj.email,"confirmada":false,"key":obj.key},function(usr){
            if (usr){
            usr.confirmada=true;
            modelo.cad.actualizarUsuario(usr,function(res){
            callback({"email":res.email}); //callback(res)
            })
            }
            else
            {
            callback({"email":-1});
            }
            })
            }
            this.loginUsuario = function (obj, callback) {
                console.log("HAS INICIADO SESON")
                this.cad.buscarUsuario({ "email": obj.email, "confirmada": true }, function (usr) {
                  if (usr && usr.password === obj.password) {
                    
                    callback(usr);
                  } else {
                    callback({ "email": -1 });
                  }
                });
              };
        

}

function Usuario(nick) {
    this.nick = nick;
}

// Exporta la clase Sistema
module.exports.Sistema = Sistema;
