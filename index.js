const fs = require("fs");
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
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

app.use(express.static(__dirname + "/"));

app.use(cookieSession({
  name: 'Sistema',
  keys: ['key1', 'key2']
}));

// Inicializa Passport
app.use(passport.initialize());

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

app.use(passport.session());

const sistema = new modelo.Sistema();

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

app.listen(PORT, () => {
    console.log(`App está escuchando en el puerto ${PORT}`);
    console.log('Ctrl+C para salir');
});

app.get("/auth/google", passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/fallo' }), function(req, res) {
        res.redirect('/good');
    });

    app.get("/good", function(request,response){
        let email=request.user.emails[0].value;
        sistema.usuarioGoogle({"email":email},function(obj){
        response.cookie('nick',obj.email);
        response.redirect('/');
        });
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

app.post("/registrarUsuario", function(request, response) {
    sistema.registrarUsuario(request.body, function(res) {
        response.send({"nick": res.email});
    });
});


app.get("/ok", function(request, response) {
    response.send({nick: request.user.email});
});

app.post("/loginUsuario", passport.authenticate("local", { 
    failureRedirect: "/fallo", 
    successRedirect: "/ok" }
), function(req, res) {
    // Esta función se ejecutará después de la autenticación
    
    console.log("Autenticación completada. Usuario autenticado:", req.user);
    
    // Puedes agregar más código aquí si lo necesitas
    
    res.send("Autenticación completada"); // O envía una respuesta al cliente
});

    app.get("/ok", function(request, response) {
        response.send({nick: request.user.email});
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