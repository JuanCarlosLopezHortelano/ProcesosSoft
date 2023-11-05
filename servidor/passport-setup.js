// Importa el módulo 'passport' que se utiliza para la autenticación en Node.js.
const passport = require("passport");

// Importa la estrategia de autenticación de Google OAuth2 de Passport.
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Importa la estrategia de autenticación local de Passport.
const LocalStrategy = require('passport-local').Strategy;

// Serializa al usuario para almacenar en la sesión.
passport.serializeUser(function(user, done) {
  done(null, user);
});

// Deserializa al usuario a partir de la sesión.
passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Configura la estrategia de autenticación de Google OAuth2.
passport.use(new GoogleStrategy({
  // Identificador de cliente (proporcionado por Google).
  clientID: "937465366567-m4lurf473go0f19ou1jrevj7n3oat164.apps.googleusercontent.com",
  
  // Clave secreta del cliente (proporcionada por Google).
  clientSecret: "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",
  
  // URL de devolución de llamada a la que Google redirigirá después de la autenticación.
  callbackURL: "http://localhost:3000/google/callback"
},
function(accessToken, refreshToken, profile, done) {
  // Función de callback que se ejecuta cuando la autenticación de Google tiene éxito.
  // En este caso, se devuelve el perfil del usuario.
  return done(null, profile);
}
));

// Configura la estrategia de autenticación local.
passport.use(new LocalStrategy({ usernameField: "email", passwordField: "password" },
  function (email, password, done) {
    sistema.loginUsuario({ "email": email, "password": password }, function (user) {
      if (user.email != -1) {
        return done(null, user);
      } else {
        return done(-1);
      }
    })
  }
));
