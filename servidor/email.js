const correo=require("./email.js");
const nodemailer = require('nodemailer');

// URL de tu aplicación, puede ser local o la URL de despliegue
const url = "http://localhost:3000/";
// const url = "tu-url-de-despliegue";

// Configuración del transporte de correo
const transporter = nodemailer.createTransport({
  service: 'gmail', // Servicio de correo a utilizar (en este caso, Gmail)
  auth: {
    user: 'juancarloslhhellin@gmail.com', // Tu dirección de correo electrónico
    pass: 'tmil oyqh uszr wcon' // Tu contraseña o clave de aplicación generada en Gmail
  }
});

// Función para enviar un correo electrónico
module.exports.enviarEmail=async function(direccion, key,men) {
  const result = await transporter.sendMail({
      from: 'juancarloslhhellin@gmail.com',
      to: direccion,
      subject: 'Confirmar cuenta',
      text: 'Pulsa aquí para confirmar cuenta',
      html: '<p>Bienvenido a Sistema</p><p><a href="'+url+'confirmarUsuario/'+direccion+'/'+key+'">Pulsa aquí para confirmar cuenta</a></p>'
  });
console.log(JSON.stringify(result, null, 4));
}
