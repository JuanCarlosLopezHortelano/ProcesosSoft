const fs = require("fs");
const express = require('express');
const app = express();
const httpServer = require('http').Server(app);
const bodyParser = require("body-parser");
const { Server } = require("socket.io");

const moduloWS = require("./servidor/servidorWS.js");

// Configuración de middleware para parsear solicitudes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




// Importa el módulo 'passport' para la autenticación en Node.js.
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

// Importa el módulo 'cookie-session' para gestionar las sesiones de cookies.
const cookieSession = require("cookie-session");

// Requiere un archivo local "./servidor/passport-setup.js" que contiene la configuración de Passport.
require("./servidor/passport-setup.js");

const modelo = require("./servidor/modelo.js");
const PORT = process.env.PORT || 3000;

// Sirve archivos estáticos desde el directorio raíz
app.use(express.static(__dirname + "/"));

app.use(cookieSession({
  name: 'Sistema',
  keys: ['key1', 'key2']
}));

// Inicializa Passport para la autenticación
app.use(passport.initialize());
app.use(passport.session());


let ws = new moduloWS.WsServidor();
let io = new Server();


// Configuración de estrategia de autenticación local
passport.use(new LocalStrategy({ usernameField: "email", passwordField: "password" },
  function (email, password, done) {
    sistema.loginUsuario({ "email": email, "password": password }, function (user) {
      if (user.email != -1) {
        console.log("SSS")
        return done(null, user);
      }  else {

        console.log("SS")
        return done(-1);
      }
    })
  }
));





const sistema = new modelo.Sistema();



// Rutas para manejar solicitudes HTTP


app.get("/", function(_request, response){
    var contenido = fs.readFileSync(__dirname + "/cliente/index.html");
    response.setHeader("Content-type", "text/html");
    response.send(contenido);
});

app.get("/agregarUsuario/:nick", function(request, response) {
    let nick = request.params.nick;
    let res = sistema.agregarUsuario(nick);
    response.send(res);
});

app.get("/obtenerUsuarios", function(request, response) {
    let res = sistema.obtenerUsuarios();
    response.json(res);
});

app.get("/numeroUsuarios", function(request, response) {
    let res = sistema.numeroUsuarios();
    response.json(res);
});

app.get("/usuarioActivo/:nick", function(request, response) {
    let nick = request.params.nick;
    let res = sistema.usuarioActivo(nick);
    response.json(res);
});

app.get("/eliminarUsuario/:nick", function(request, response) {
    let nick = request.params.nick;
    let res = sistema.eliminarUsuario(nick);
    response.json(res);
});

// Rutas para autenticación con Google

app.get("/auth/google", passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/fallo' }), 
    function(req, res) {
        res.redirect('/good');
    });

app.post('/oneTap/callback',
    passport.authenticate('google-one-tap', { failureRedirect: '/fallo' }),
    function(req, res) {
        res.redirect('/good');

    });



// Rutas para autenticación con GitHub

app.get('/auth/github',passport.authenticate('github', { scope: [ 'user:email' ] }));
    

app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/fallo' }),
function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/good');
});

    
  // Ruta de éxito en la autenticación
app.get("/good", function(request,response){
    console.log("Contenido de request.user:", request);

    if (request.user && request.user.emails && request.user.emails.length > 0) {
        let email = request.user.emails[0].value;
        sistema.usuarioGoogle({"email": email}, function(obj){
            response.cookie('nick', obj.email);
            response.redirect('/');
        });
    } else {
        // Manejar el caso en el que no hay email disponible en el usuario autenticado
        console.log("No se encontró un email válido en el usuario autenticado");
        // Redirigir a una página de error u otra página relevante
        response.redirect('/error');
    }
});





app.get("/fallo", function(request, response) {

    response.send({nick: "nook"});
});

app.post('/enviarJwt', function(request, response) {
    let jwt = request.body.jwt;
    let user = JSON.parse(atob(jwt.split(".")[1]));
    let email = user.email;

    sistema.usuarioGoogle({"email": email}, function(obj) {
        response.send({'nick': obj.email});
    });
});

app.post("/registrarUsuario",function(request,response){
    sistema.registrarUsuario(request.body,function(res){
    response.send({"nick":res.email});
    });
    });


app.get("/ok", function(request, response) {
    
    response.send({"nick": request.user.email});
});

app.post("/loginUsuario", passport.authenticate("local", { 
    failureRedirect: "/fallo", 
    successRedirect: "/ok" }
), function(req, res) {
    // Esta función se ejecutará después de la autenticación
    
    console.log("Autenticación completada. Usuario autenticado:", req.user);
    
    
    
});



/* app.post("/loginUsuario", function(request, response) {
    console.log("HAS LLEGADO HASTA AQUI")
    sistema.loginUsuario(request.body, function(res) {

        response.send({"nick": res.email});
    });
});


app.get("/ok", function(request, response) {
    response.send({ nick: request.user.email });
});

app.get("/fallo", function(request, response) {
    response.send({ nick: "nook" });
});
 */


app.get("/confirmarUsuario/:email/:key",function(request,response){
    let email=request.params.email;
    let key=request.params.key;
    sistema.confirmarUsuario({"email":email,"key":key},function(usr){
    if (usr.email!=-1){
    response.cookie('nick',usr.email);
    }
    response.redirect('/');
    });
    })
    


const haIniciado=function(request,response,next){
            if (request.user){
            next();
            }
            else{
            response.redirect("/")
            }
            }        

app.get("/obtenerUsuarios",haIniciado,function(request,response){
                let lista=sistema.obtenerUsuarios();
                response.send(lista);
                });


app.get("/cerrarSesion",haIniciado,function(request,response){
                    let nick=request.user.nick;
                    request.logout();
                    response.redirect("/");
                    if (nick){
                    sistema.eliminarUsuario(nick);
                    }
                    });

                    app.post('/oneTap/callback',
                    passport.authenticate('google-one-tap', { failureRedirect: '/fallo' }),
                    function(req, res) {
                    res.redirect('/good');
                });

httpServer.listen(PORT, () => {
    console.log(`App está escuchando en el puerto ${PORT}`);
    console.log('Ctrl+C para salir');
});

io.listen(httpServer);
ws.lanzarServidor(io,sistema);
                    