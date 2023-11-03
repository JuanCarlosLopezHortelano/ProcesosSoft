const fs=require("fs");
const express = require('express');
const app = express();

////////////////////////////////////////////////////////////////////////////////////////////////
// Importa el módulo 'passport' que se utiliza para la autenticación en Node.js.
const passport = require("passport");
// Importa el módulo 'cookie-session' que se utiliza para gestionar las sesiones de cookies.
const cookieSession = require("cookie-session");
// Requiere un archivo local "./servidor/passport-setup.js" que contiene la configuración de Passport.
require("./servidor/passport-setup.js");
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
const modelo = require("./servidor/modelo.js");
// Define un puerto para la aplicación, utilizando el puerto proporcionado por el entorno (si está disponible) o el puerto 3000 por defecto.
const PORT = process.env.PORT || 3000;
// Configura Express para servir archivos estáticos desde la ruta actual (__dirname).
app.use(express.static(__dirname + "/"));
// Configura una sesión de cookies utilizando el middleware "cookieSession". -Nombre de la sesion de cooki - SISTEMA -Claves Secretas key1 y key2
app.use(cookieSession({
  name: 'Sistema',
  keys: ['key1', 'key2']
 }));

 // Inicializacion
app.use(passport.initialize());
app.use(passport.session());
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////


let sistema = new modelo.Sistema();

// Nueva función app.get("/")
app.get("/", function(_request,response){
    // Leer el contenido del archivo index.html
    var contenido = fs.readFileSync(__dirname + "/cliente/index.html");
  
    // Establecer el tipo de contenido de la respuesta
    response.setHeader("Content-type","text/html");
  
    // Enviar la respuesta
    response.send(contenido);
  });

  app.get("/agregarUsuario/:nick",function(request,response){
    let nick=request.params.nick;
    let res=sistema.agregarUsuario(nick);
    
    response.send(res);
    });


  app.get("/obtenerUsuarios",function(request,response){
      
      let res=sistema.obtenerUsuarios();
      
      response.json(res);
      });
  
  app.get("/numeroUsuarios",function(request,response){
      
        let res=sistema.numeroUsuarios();
        
        response.json(res);
        });
      
  app.get("/usuarioActivo/:nick",function(request,response){
        let nick=request.params.nick;
        let res=sistema.usuarioActivo(nick);
        
        response.json(res);
        });

  app.get("/eliminarUsuario/:nick",function(request,response){
          let nick=request.params.nick;
          let res=sistema.eliminarUsuario(nick);
          
          response.json(res);
          });
  

  app.listen(PORT, () => {
console.log(`App está escuchando en el puerto ${PORT}`);
console.log('Ctrl+C para salir');
});

app.get("/auth/google",passport.authenticate('google', { scope: ['profile','email'] }));
app.get('/google/callback',
 passport.authenticate('google', { failureRedirect: '/fallo' }), function(req, res) {
  res.redirect('/good');
 });
 
 app.get("/good", function(request,response){
  let nick=request.user.emails[0].value;
  if (nick){
  sistema.agregarUsuario(nick);
  }
  //console.log(request.user.emails[0].value);
  response.cookie('nick',nick);
  response.redirect('/');
 });


app.get("/fallo",function(request,response){
 response.send({nick:"nook"})
});