
const bcrypt = require('bcrypt');

const { v4: uuidv4 } = require('uuid');



function Sistema() {
    // Objeto que almacena a los usuarios
    this.usuarios = {};
     
    //Objeto que almacena partidas
    this.partidas = {};

    // Conexión a la base de datos
    //this.cad = new cad.CAD();

    // Verifica si un usuario está activo
    this.usuarioActivo = function (nick) {
        if (nick in this.usuarios) {
            return { "activo": true };
        } else {
            return { "activo": false };
        }
    }

   
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

    this.registrarUsuario = function (obj, callback) {
        let modelo = this;
        if (!obj.nick) {
          obj.nick = obj.email;
        }
      
        // Genera un hash de la clave antes de almacenarla
        bcrypt.hash(obj.password, 10, function (err, hash) {
          if (err) {
            console.error(err);
            return callback({ "error": "No se pudo cifrar la clave" });
          }
      
          // Sustituye la clave original con el hash
          obj.password = hash;
      
          modelo.cad.buscarUsuario({"email":obj.email}, function (usr) {
            if (!usr) {

              // El usuario no existe, luego lo puedo registrar
              obj.key = Date.now().toString();
              obj.confirmada = false;
              modelo.cad.insertarUsuario(obj, function (res) {
                
                callback(res);
              });
              correo.enviarEmail(obj.email, obj.key, "Confirmar cuenta");
              
            }
            else {
              
              console.log("El email ya esta ocupado")
              callback({"email": -1});
            }
          });
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


           // Método para verificar la clave durante el inicio de sesión
this.loginUsuario = function (obj, callback) {

            this.cad.buscarUsuario({ "email":obj.email, "confirmada":true }, function (usr) {
              if (usr) {
                // Compara la clave cifrada almacenada en la base de datos con la clave proporcionada

                
                bcrypt.compare(obj.password, usr.password, function (err, result) {
                  if (err) {
                    console.error(err);
                    return callback({ "error": "Error al comparar las claves" });
                  }
          
                  if (result) {
                    console.log("Las contraseñas coinciden.");
                    callback(usr);

                  } else {
                    console.log("Las contraseñas no coinciden.");
                    callback({ "email": -1 });
                  }
                });
              } else {
                callback({ "email": -1 });
              }
            });
          }



          //Crear Partidas

          
      this.crearPartida = function (email) {
            
        let propietario = this.usuarios[email];
            if (!propietario) {
                console.log("El usuario no existe");
                return { "error": "El usuario no existe" };
            }
    
            const codigo = this.generarIdPartida();
            const partida = new Partida(codigo, propietario);
            this.partidas[codigo] = partida;
            console.log("Codigo:",{codigo},"Propietario:",{propietario})
            return { "idPartida": codigo, "propietario": propietario.nick };
        }


        this.unirseAPartida = function (idPartida, email) {
          const jugador = this.usuarios[email];
          if (!jugador) {
              console.log("El usuario no existe");
              return { "error": "El usuario no existe" };
          }
  
          if (this.partidas[idPartida]) {
              let partida = this.partidas[idPartida];
              if (partida.jugadores.length < partida.maxJug) {
                  partida.jugadores.push(jugador);
                  return { "idPartida": idPartida, "jugador": jugador.nick };
              } else {
                  console.log("La partida está llena");
                  return { "error": "La partida está llena" };
              }
          } else {
              console.log("La partida no existe");
              return { "idPartida": -1 };
          }
        }
    

    this.eliminarPartida = function(idPartida){
      if (this.partidas[idPartida]) {
        delete this.partidas[idPartida];
        return { "idPartida": idPartida };
    } else {
        console.log("La partida no existe");
        return { "idPartida": -1 };
    }
    }

    this.generarIdPartida = function () {
      // Genera un ID único para la partida usando UUID
      return uuidv4();
  }


  

  }


            

              
      

function Usuario(nick) {
    this.nick = nick;
}

function Partida(codigo){
  this.codigo = codigo;
  this.jugadores = [];
  this.maxJug = 2;
  
  }





// Exporta la clase Sistema
module.exports.Sistema = Sistema;
