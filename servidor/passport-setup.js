// Importa el módulo 'passport' que se utiliza para la autenticación en Node.js.
const passport = require("passport");

// Importa la estrategia de autenticación de Google OAuth2 de Passport.
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GoogleOneTapStrategy = require("passport-google-one-tap").GoogleOneTapStrategy;


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
  //clientID: "937465366567-5qcj9vucp1pah0muucdkfkpsv2pe2ls5.apps.googleusercontent.com",
  clientID: "937465366567-m4lurf473go0f19ou1jrevj7n3oat164.apps.googleusercontent.com",
  // Clave secreta del cliente (proporcionada por Google).
  //clientSecret: "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",  //PRODUCCION
  clientSecret: "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", 
  // URL de devolución de llamada a la que Google redirigirá después de la autenticación.
  callbackURL: "https://procesossoft-yhkqrakm7q-ew.a.run.app/google/callback"  //PRODUCCION
  //callbackURL: "http://localhost:3000/google/callback"
},
function(accessToken, refreshToken, profile, done) {
  // Función de callback que se ejecuta cuando la autenticación de Google tiene éxito.
  // En este caso, se devuelve el perfil del usuario.
  return done(null, profile);
}
));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
passport.use(
  new GoogleOneTapStrategy(
    {
      clientID: "937465366567-irddfe7qmv7k8qlu048oogc7of6isjo6.apps.googleusercontent.com", // your google client ID
      clientSecret: "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", // your google client secret
      verifyCsrfToken: false, // whether to validate the csrf token or not
    },
    function (profile, done) {
      // Here your app code, for example:
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });
      return done(null, profile);
    }
  )
  );

